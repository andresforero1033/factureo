from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class ContractCreate(BaseModel):
    employee_id: str
    contract_type: str
    work_schedule: str
    start_date: date
    end_date: Optional[date] = None
    salary_cents: int
    currency: str = "COP"
    is_active: bool = True

class ContractResponse(ContractCreate):
    id: str
    created_at: datetime