from django.contrib import admin
from .models import Category, Product, ProductImage, Order, Checkout, Review, Cart, Address, Refund

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

class ProductImageInline(admin.TabularInline):
    model = ProductImage

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_level')
    list_filter = ('category',)
    inlines = [ProductImageInline]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_price', 'status', 'created_at')
    list_filter = ('status',)

@admin.register(Checkout)
class CheckoutAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'payment_method', 'transaction_id')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'text', 'created_at')
    list_filter = ('product',)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'total_price', 'created_at', 'updated_at')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'street_address', 'city', 'state', 'country', 'zip_code')

@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('user', 'order', 'refund_amount', 'reason', 'status')
    list_filter = ('status',)