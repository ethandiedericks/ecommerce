from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import CustomUserSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
    View for user registration.

    Attributes:
    - serializer_class: Serializer class for user registration.
    - permission_classes: List of permissions required for accessing the view.
    """

    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Handles user registration.

        Parameters:
        - request: HTTP request object.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(password=request.data["password"], is_active=True)

        # Create a refresh token for the new user
        refresh = RefreshToken.for_user(user)

        response_data = {
            "user": serializer.data,
            "refresh_token": str(refresh),
            "access_token": str(refresh.access_token),
        }

        print(f"User {user.email} registered successfully.")
        print(f"Refresh Token: {refresh}")
        print(f"Access Token: {refresh.access_token}")

        return Response(response_data, status=status.HTTP_201_CREATED)


class BlacklistTokenView(APIView):
    """
    View for blacklisting refresh tokens.

    Attributes:
    - permission_classes: List of permissions required for accessing the view.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        Handles blacklisting of refresh tokens.

        Parameters:
        - request: HTTP request object.
        """
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Token successfully blacklisted."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserLogoutView(APIView):
    """
    View for user logout.

    Attributes:
    - permission_classes: List of permissions required for accessing the view.
    """

    def post(self, request):
        """
        Handles user logout.

        Parameters:
        - request: HTTP request object.
        """
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(
                    {"message": "Successfully logged out."}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "Refresh token not provided."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": "Error logging out."}, status=status.HTTP_400_BAD_REQUEST
            )
