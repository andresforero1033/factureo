from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

# Configuración de seguridad
SECRET_KEY = "factureo_clave_super_secreta" # En el futuro cambiaremos esto
ALGORITHM = "HS256"

# Herramienta para encriptar contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    # El token dura 2 horas
    expire = datetime.utcnow() + timedelta(hours=2)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)