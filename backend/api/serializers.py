from users.serializers import CustomUserSerializer
from rest_framework import serializers

from .models import (
    Category,
    Product,
    Order,
    OrderItem,
    Checkout,
    Review,
    Cart,
    Address,
    Refund,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    category = CategorySerializer()

    def get_average_rating(self, obj):
        return Review.get_average_rating(obj.id)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "category",
            "stock_level",
            "image",
            "average_rating",
        )


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Review
        fields = ("user", "product", "rating", "text", "created_at")

class CartSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    product = ProductSerializer()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = "__all__"
