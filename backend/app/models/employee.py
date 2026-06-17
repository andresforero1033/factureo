from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date

class ContactInfo(BaseModel):
    phone: str
    address: str

class PersonalData(BaseModel):
    birth_date: date
    gender: str
    civil_status: str
    id_number: str

class HealthInfo(BaseModel):
    blood_type: str
    eps: str
    allergies: Optional[str] = None

class FamilyInfo(BaseModel):
    emergency_contact_name: str
    emergency_contact_phone: str
    emergency_relationship: Optional[str] = None  # <--- Este es el campo que faltaba

class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    department: str
    position: str
    is_active: bool = True
    contact_info: ContactInfo
    personal_data: PersonalData
    health_info: HealthInfo
    family_info: FamilyInfo
    profile_picture: Optional[str] = None

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    position: Optional[str] = None
    is_active: Optional[bool] = None
    contact_info: Optional[ContactInfo] = None
    personal_data: Optional[PersonalData] = None
    health_info: Optional[HealthInfo] = None
    family_info: Optional[FamilyInfo] = None
    profile_picture: Optional[str] = None

class EmployeeResponse(EmployeeCreate):
    id: str
    created_at: datetime
    updated_at: datetime
    personal_data: Optional[PersonalData] = None 
    health_info: Optional[HealthInfo] = None
    family_info: Optional[FamilyInfo] = None
    profile_picture: Optional[str] = None