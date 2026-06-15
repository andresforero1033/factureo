from datetime import datetime, date
from bson import ObjectId

# Función auxiliar para convertir objetos 'date' de Python a strings (ISO format)
# Esto evita el error de MongoDB al no reconocer el tipo de dato 'date'
def clean_dates(data):
    if isinstance(data, dict):
        return {k: clean_dates(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_dates(v) for v in data]
    elif isinstance(data, date): 
        return data.isoformat()
    return data

async def create_employee_in_db(db, employee):
    # Convertimos el modelo Pydantic a diccionario
    new_employee = employee.model_dump()
    
    # Limpiamos las fechas antes de guardar
    new_employee = clean_dates(new_employee)
    
    new_employee["created_at"] = datetime.utcnow()
    new_employee["updated_at"] = datetime.utcnow()
    
    result = await db["employees"].insert_one(new_employee)
    created_employee = await db["employees"].find_one({"_id": result.inserted_id})
    created_employee["id"] = str(created_employee.pop("_id"))
    return created_employee

async def get_all_employees_from_db(db):
    employees = []
    cursor = db["employees"].find({})
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        employees.append(doc)
    return employees

async def update_employee_in_db(db, employee_id: str, employee_data: dict):
    # --- APLICA LA LIMPIEZA AQUÍ ---
    # Esto asegura que si 'birth_date' viene como objeto date, se pase a string
    employee_data = clean_dates(employee_data)
    # -------------------------------
    
    employee_data["updated_at"] = datetime.utcnow()
    
    await db["employees"].update_one(
        {"_id": ObjectId(employee_id)}, 
        {"$set": employee_data}
    )
    
    updated_employee = await db["employees"].find_one({"_id": ObjectId(employee_id)})
    if updated_employee:
        updated_employee["id"] = str(updated_employee.pop("_id"))
    return updated_employee

async def delete_employee_from_db(db, employee_id: str):
    result = await db["employees"].delete_one({"_id": ObjectId(employee_id)})
    return result.deleted_count > 0