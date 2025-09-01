from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password']  # 👈 quitamos username
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        # 🔥 Generar username automáticamente con la parte antes del @
        username = email.split('@')[0]

        user = CustomUser(
            username=username,
            email=email
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
