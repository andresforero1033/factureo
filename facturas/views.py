from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Cliente, Factura, DetalleFactura
from .serializers import ProductoSerializer, ClienteSerializer, FacturaSerializer, DetalleFacturaSerializer

# Productos
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]  # requiere token

# Clientes
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]  # requiere token

# Facturas
class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    permission_classes = [IsAuthenticated]  # requiere token

# Detalles de factura
class DetalleFacturaViewSet(viewsets.ModelViewSet):
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer
    permission_classes = [IsAuthenticated]  # requiere token
