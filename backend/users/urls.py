from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import UserLogoutView, UserRegistrationView, BlacklistTokenView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("token/blacklist/", BlacklistTokenView.as_view(), name="token_blacklist"),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]