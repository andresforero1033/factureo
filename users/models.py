from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # hacemos que el email sea único

    def __str__(self):
        return self.username
    
# Nota: Asegúrate de actualizar la configuración AUTH_USER_MODEL en settings.py: