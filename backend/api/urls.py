from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    ProductListAPIView,
    ProductByCategoryListAPIView,
    CategoryListView,
    AddToCartAPIView,
)

urlpatterns = [
    path("products/", ProductListAPIView.as_view(), name="product-list"),
    path(
        "products/category/<int:category_id>/",
        ProductByCategoryListAPIView.as_view(),
        name="product-by-category",
    ),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("add-to-cart/", AddToCartAPIView.as_view(), name="add-to-cart"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
