from django.db.models import Avg, Sum, F
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Category,
    Product,
    Cart,
    Order,
    OrderItem,
    Checkout,
    Review,
    Address,
    Refund,
)
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    CartSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CheckoutSerializer,
    ReviewSerializer,
    AddressSerializer,
    RefundSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        category = self.get_object()
        products = category.product_set.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=["get"])
    def reviews(self, request, pk=None):
        product = self.get_object()
        reviews = product.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def top_rated(self, request, pk=None):
        product = self.get_object()
        avg_rating = product.review_set.aggregate(Avg("rating"))["rating__avg"]
        return Response({"average_rating": avg_rating})


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))  # Default quantity is 1

        try:
            cart_instance = Cart.objects.get(user=request.user, product_id=product_id)
            # Increase the quantity of the existing cart item
            cart_instance.quantity = cart_instance.quantity + quantity
            cart_instance.save()
        except Cart.DoesNotExist:
            try:
                product = Product.objects.get(pk=product_id)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

            cart_instance = Cart.objects.create(
                user=request.user,
                product=product,
                quantity=quantity
            )

        serializer = self.get_serializer(cart_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RefundViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticated]
