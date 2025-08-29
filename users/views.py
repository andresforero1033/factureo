from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer

# ViewSet para CRUD de usuarios (protegido por defecto)
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # solo usuarios logueados pueden ver/editar usuarios

# Endpoint para registrar nuevos usuarios (acceso libre)
class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # cualquiera puede registrarse
