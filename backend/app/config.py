import os
from dotenv import load_dotenv

# Cargar las variables del archivo .env
load_dotenv()

class Settings:
    PROJECT_NAME: str = "Factureo API"
    VERSION: str = "1.0"
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    # A futuro, aquí agregaremos: JWT_SECRET, FRONTEND_URL, etc.

settings = Settings()