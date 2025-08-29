from django.urls import path
from .views import RegisterUserView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),    # Registro
    path('login/', TokenObtainPairView.as_view(), name='login'),        # Login JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refrescar token
    path('logout/', LogoutView.as_view(), name='logout'),               # Logout JWT
]
