from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"categories", views.CategoryViewSet)
router.register(r"products", views.ProductViewSet)
router.register(r'carts', views.CartViewSet, basename='cart')
router.register(r"addresses", views.AddressViewSet)
router.register(r"reviews", views.ReviewViewSet)
router.register(r"refunds", views.RefundViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "products/<int:pk>/reviews/",
        views.ProductViewSet.as_view({"get": "reviews"}),
        name="product-reviews",
    ),
    path(
        "products/<int:pk>/top-rated/",
        views.ProductViewSet.as_view({"get": "top_rated"}),
        name="top-rated-products",
    ),
    path(
        "categories/<int:pk>/products/",
        views.CategoryViewSet.as_view({"get": "products"}),
        name="products-by-category",
    ),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
