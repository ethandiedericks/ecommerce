from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"categories", views.CategoryViewSet)
router.register(r"products", views.ProductViewSet)
router.register(r"carts", views.CartViewSet)
router.register(r"orders", views.OrderViewSet)
router.register(r"reviews", views.ReviewViewSet)
router.register(r"addresses", views.AddressViewSet)
router.register(r"refunds", views.RefundViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
