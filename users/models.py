from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Usamos el email como identificador de login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # username sigue existiendo, pero no es obligatorio para login

    def __str__(self):
        return self.email
