from datetime import datetime
from bson import ObjectId
from app.models.contract import ContractCreate

async def create_contract_in_db(db, contract: ContractCreate):
    new_contract = contract.model_dump()
    # Convertimos strings de fecha a datetime para MongoDB
    new_contract["start_date"] = datetime.combine(new_contract["start_date"], datetime.min.time())
    if new_contract["end_date"]:
        new_contract["end_date"] = datetime.combine(new_contract["end_date"], datetime.min.time())
    
    new_contract["created_at"] = datetime.utcnow()
    
    result = await db["contracts"].insert_one(new_contract)
    created_contract = await db["contracts"].find_one({"_id": result.inserted_id})
    created_contract["id"] = str(created_contract.pop("_id"))
    return created_contract

async def get_contracts_by_employee(db, employee_id: str):
    contracts = []
    cursor = db["contracts"].find({"employee_id": employee_id})
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        contracts.append(doc)
    return contracts