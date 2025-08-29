from rest_framework import serializers
from .models import Producto, Cliente, Factura, DetalleFactura

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio']

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'email']

class DetalleFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleFactura
        fields = ['id', 'producto', 'cantidad', 'precio']

class FacturaSerializer(serializers.ModelSerializer):
    productos = DetalleFacturaSerializer(many=True, read_only=True)
    cliente = ClienteSerializer(read_only=True)

    class Meta:
        model = Factura
        fields = ['id', 'cliente', 'productos', 'fecha']
