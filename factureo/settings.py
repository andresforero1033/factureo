from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ksu4_2%^=747lb37^1pn4(t8!jqma3t*@ryw2%s=m2ak-d(dt5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True  # ⚠️ Cambia a False en producción

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]  # Agrega tu dominio en producción


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Apps del proyecto
    'users',       # App de usuarios
    'facturas',    # App de gestión de facturas

    # Terceros
    'rest_framework',  # Django REST Framework
    'rest_framework_simplejwt.token_blacklist',  # Blacklist de tokens
    'corsheaders',  # Manejo de CORS
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS debe ir arriba
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'factureo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Puedes agregar carpetas de templates si lo necesitas
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'factureo.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Usa PostgreSQL en producción
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},  # Contraseña mínima de 8 caracteres
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = []  # Carpetas adicionales (ej: frontend compilado)
STATIC_ROOT = BASE_DIR / "staticfiles"  # Producción

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Custom user model
AUTH_USER_MODEL = "users.CustomUser"


# Django REST Framework config
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # Por defecto, requiere auth
    ),
}


# JWT Config
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),  # Token de acceso válido 30 min
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Token de refresco válido 1 día
    'ROTATE_REFRESH_TOKENS': True,                  # Genera refresh token nuevo al hacer login
    'BLACKLIST_AFTER_ROTATION': True,               # Invalida el refresh token antiguo
}


# CORS config
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React en dev
]
# Si quieres permitir todos (solo en dev):
# CORS_ALLOW_ALL_ORIGINS = True
