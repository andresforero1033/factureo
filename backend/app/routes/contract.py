from fastapi import APIRouter, Depends
from app.database import get_database
from app.models.contract import ContractCreate, ContractResponse
from app.services.contract import create_contract_in_db, get_contracts_by_employee

router = APIRouter(prefix="/api/contracts", tags=["Contracts"])

@router.post("/", response_model=ContractResponse)
async def create_contract(contract: ContractCreate, db=Depends(get_database)):
    return await create_contract_in_db(db, contract)

@router.get("/employee/{employee_id}", response_model=list[ContractResponse])
async def get_employee_contracts(employee_id: str, db=Depends(get_database)):
    return await get_contracts_by_employee(db, employee_id)