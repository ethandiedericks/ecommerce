from django.contrib import admin

from .models import (
    Category,
    Product,
    Order,
    Checkout,
    Review,
    Cart,
    Address,
    Refund,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
    )
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "stock_level",
    )
    list_filter = ("category",)
    search_fields = (
        "name",
        "description",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "total_price",
        "status",
        "created_at",
    )
    list_filter = ("status",)
    search_fields = (
        "user__username",
        "status",
    )
    date_hierarchy = "created_at"


@admin.register(Checkout)
class CheckoutAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "amount",
        "payment_method",
        "transaction_id",
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "product",
        "rating",
        "created_at",
    )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "product",
        "quantity",
        "created_at",
        "updated_at",
    )
    readonly_fields = ("created_at", "updated_at")

    def total_price(self, obj):
        return obj.product.price * obj.quantity

    total_price.short_description = "Total Price"


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "street_address",
        "city",
        "state",
        "country",
        "zip_code",
    )


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "order",
        "refund_amount",
        "status",
    )
    list_filter = ("status",)
