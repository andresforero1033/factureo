from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from facturas.views import ProductoViewSet, ClienteViewSet, FacturaViewSet, DetalleFacturaViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# DRF router
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'detalles', DetalleFacturaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),                    # endpoints CRUD
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh
    path('api/', include('users.urls')),            # endpoint de registro
]
