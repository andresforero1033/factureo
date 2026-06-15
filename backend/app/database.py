from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# Instanciamos el cliente con la URI de Atlas
client = AsyncIOMotorClient(settings.MONGO_URI)

# Apuntamos explícitamente a la base de datos "factureo"
db = client.factureo

def get_database():
    return db