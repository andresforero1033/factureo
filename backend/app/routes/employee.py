# backend/app/routes/employees.py
from pathlib import Path
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.database import get_database
from app.models.employee import EmployeeCreate, EmployeeResponse, EmployeeUpdate
from app.services.employee import create_employee_in_db, get_all_employees_from_db, update_employee_in_db, delete_employee_from_db

router = APIRouter(prefix="/api/employees", tags=["Employees"])
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# --- RUTA PARA SUBIR IMAGEN ---
@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    original_extension = Path(file.filename or "").suffix.lower()
    safe_filename = f"{uuid.uuid4().hex}{original_extension}"
    file_path = UPLOAD_DIR / safe_filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/static/uploads/{safe_filename}"}

@router.post("/", response_model=EmployeeResponse)
async def create_employee(employee: EmployeeCreate, db=Depends(get_database)):
    return await create_employee_in_db(db, employee)

@router.get("/", response_model=list[EmployeeResponse])
async def get_employees(db=Depends(get_database)):
    return await get_all_employees_from_db(db)

@router.put("/{id}", response_model=EmployeeResponse)
async def update_employee(id: str, employee: EmployeeUpdate, db=Depends(get_database)):
    update_data = {k: v for k, v in employee.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    return await update_employee_in_db(db, id, update_data)

@router.delete("/{id}")
async def delete_employee(id: str, db=Depends(get_database)):
    deleted = await delete_employee_from_db(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return {"message": "Empleado eliminado exitosamente"}