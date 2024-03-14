from rest_framework import serializers
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
from users.serializers import CustomUserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_average_rating(self, obj):
        return Review.get_average_rating(obj.id)


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "total_price",
            "status",
            "created_at",
            "user",
            "shipping_address",
            "billing_address",
            "products",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"


class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = "__all__"


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = "__all__"
