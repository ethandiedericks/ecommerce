from django.db import IntegrityError, transaction
from django.db.models import Avg, Sum

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Category,
    Product,
    Cart,
    Order,
    Review,
    Address,
    Refund,
    Checkout,
)
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    CartSerializer,
    OrderSerializer,
    ReviewSerializer,
    AddressSerializer,
    RefundSerializer,
    CheckoutSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for handling CRUD operations related to Category model.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        """
        Retrieves all products belonging to a specific category.
        """
        category = self.get_object()
        products = Product.objects.filter(category=category).prefetch_related("reviews")
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for handling CRUD operations related to Product model.
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=["get"])
    def reviews(self, request, pk=None):
        """
        Retrieves all reviews for a specific product.
        """
        product = self.get_object()
        reviews = Review.objects.filter(product=product)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def top_rated(self, request, pk=None):
        """
        Retrieves the average rating for a specific product.
        """
        product = self.get_object()
        avg_rating = product.review_set.aggregate(Avg("rating"))["rating__avg"]
        return Response({"average_rating": avg_rating})


class CreateRetrieveViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    """
    A ViewSet for handling create and retrieve operations.
    """

    pass


class CartViewSet(CreateRetrieveViewSet):
    """
    A ViewSet for handling CRUD operations related to Cart model.
    """

    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieves all carts belonging to the authenticated user.
        """
        return Cart.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        """
        Retrieves a list of carts belonging to the authenticated user.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Creates a cart item or updates quantity if item already exists in the cart.
        """
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        try:
            cart_instance = Cart.objects.get(user=request.user, product_id=product_id)
            cart_instance.quantity += quantity
            cart_instance.save()
        except Cart.DoesNotExist:
            try:
                product = Product.objects.get(pk=product_id)
            except Product.DoesNotExist:
                raise NotFound("Product not found")

            try:
                cart_instance = Cart.objects.create(
                    user=request.user, product=product, quantity=quantity
                )
            except IntegrityError:
                raise ValidationError("Cart item already exists")

        serializer = self.get_serializer(cart_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["delete"])
    def remove_item(self, request, pk=None):
        """
        Removes an item from the cart.
        """
        try:
            cart_item = Cart.objects.get(pk=pk, user=request.user)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response(
                {"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND
            )

    def perform_create(self, serializer):
        """
        Performs additional checks before creating a cart item.
        """
        if (
            serializer.validated_data["product"].stock_level
            < serializer.validated_data["quantity"]
        ):
            raise ValidationError("Not enough stock for the selected product.")
        serializer.save()


class OrderViewSet(CreateRetrieveViewSet):
    """
    A ViewSet for handling CRUD operations related to Order model.
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieves all orders belonging to the authenticated user.
        """
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Sets the user for the order before creating it.
        """
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        """
        Retrieves a list of orders belonging to the authenticated user.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def checkout(self, request):
        """
        Initiates the checkout process by creating a new order.
        """
        user = request.user

        # Check if the user has an address
        try:
            address = Address.objects.get(user=user)
        except Address.DoesNotExist:
            raise ValidationError("You need to add an address before checking out.")

        # Get products from the user's cart
        cart_items = Cart.objects.filter(user=user)

        # Check if the cart is empty
        if not cart_items.exists():
            return Response(
                {"message": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Calculate total price based on items in the cart
        total_price = self.calculate_total_price(cart_items)

        # Create the order with calculated total price and products from the cart
        with transaction.atomic():
            order = Order.objects.create(
                user=user,
                total_price=total_price,
                shipping_address=address,
                billing_address=address,
                status="pending",
            )
            order.products.set([item.product for item in cart_items])

        # Clear the user's cart after checkout
        cart_items.delete()

        # Return the newly created order details
        order_serializer = OrderSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)

    def calculate_total_price(self, cart_items):
        """
        Calculate the total price based on items in the user's cart.
        """
        total_price = sum(item.total_price for item in cart_items)
        return total_price


class ReviewViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for handling CRUD operations related to Review model.
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieves all reviews belonging to the authenticated user.
        """
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Sets the user for the review before creating it.
        """
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Ensure that 'product_id' is present in the request data
        product_id = request.data.get("product_id")
        if not product_id:
            return Response(
                {"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise NotFound("Product not found")

        request_data = request.data.copy()
        request_data.pop("product_id", None)
        request_data["user"] = request.user  # Set the user field

        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)

        try:
            review = serializer.save(user=request.user, product=product)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            self.get_serializer(review).data, status=status.HTTP_201_CREATED
        )


class AddressViewSet(CreateRetrieveViewSet):
    """
    A ViewSet for handling CRUD operations related to Address model.
    """

    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieves all addresses belonging to the authenticated user.
        """
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Sets the user for the address before creating it.
        """
        serializer.save(user=self.request.user)


class RefundViewSet(CreateRetrieveViewSet):
    """
    A ViewSet for handling CRUD operations related to Refund model.
    """

    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Checks if the user is allowed to request a refund and then creates it.
        """
        order = Order.objects.get(pk=serializer.validated_data["order"].pk)
        if order.user != self.request.user:
            raise ValidationError(
                "You cannot request a refund for someone else's order."
            )
        serializer.save(user=self.request.user)
