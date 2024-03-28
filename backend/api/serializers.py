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
    ProductImage
)
from users.serializers import CustomUserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "category", "stock_level", "images", "average_rating"]

    def get_average_rating(self, obj):
        return Review.get_average_rating(obj.id)

    def get_images(self, obj):
        images = ProductImage.objects.filter(product=obj)
        return [image.image.url for image in images]


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
