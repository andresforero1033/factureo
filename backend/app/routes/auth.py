from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin
from app.database import get_database
from app.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticación"])
db = get_database()

@router.post("/register")
async def register_user(user: UserCreate):
    # 1. Verificar si el usuario ya existe en la base de datos
    existing_user = await db["users"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")
    
    # 2. Encriptar la contraseña y guardar
    user_data = user.dict()
    user_data["password"] = get_password_hash(user.password)
    
    await db["users"].insert_one(user_data)
    return {"message": "Usuario registrado exitosamente"}

@router.post("/login")
async def login_user(user: UserLogin):
    # 1. Buscar al usuario
    db_user = await db["users"].find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")
    
    # 2. Verificar que la contraseña coincida
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")
    
    # 3. Crear el token de acceso
    access_token = create_access_token(data={"sub": db_user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}