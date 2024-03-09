from django.db.models import Avg, Sum
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    Category,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
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
    PaymentSerializer,
    ReviewSerializer,
    AddressSerializer,
    RefundSerializer,
    CartItemSerializer, # Importing CartItemSerializer
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

class CartItemViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            cart, created = Cart.objects.get_or_create(user=user)
            serializer.save(cart=cart)  # Assign the cart object

            # Recalculate total price of the cart
            cart.total_price = CartItem.objects.filter(cart=cart).aggregate(Sum('product__price'))['product__price__sum']
            cart.save()

            return Response({'detail': 'Product added to cart successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        user = request.user
        cart = get_object_or_404(Cart, user=user)
        serializer = CartSerializer(cart, many=False)  # Change many to False
        return Response(serializer.data)

    
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RefundViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    permission_classes = [IsAuthenticated]
