from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.address import Address
from ..schemas.address import AddressCreate, AddressRead

router = APIRouter(prefix="/addresses", tags=["addresses"])

@router.get("/", response_model=list[AddressRead])
def get_addresses(db: Session = Depends(get_db)):
    return db.query(Address).all()

@router.get("/{id}", response_model=AddressRead)
def get_address(id: int, db: Session = Depends(get_db)):
    addr = db.query(Address).filter(Address.id == id).first()
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")
    return addr

@router.post("/", response_model=AddressRead)
def create_address(address: AddressCreate, db: Session = Depends(get_db)):
    db_addr = Address(**address.dict())
    db.add(db_addr)
    db.commit()
    db.refresh(db_addr)
    return db_addr

@router.put("/{id}", response_model=AddressRead)
def update_address(id: int, address: AddressCreate, db: Session = Depends(get_db)):
    db_addr = db.query(Address).filter(Address.id == id).first()
    if not db_addr:
        raise HTTPException(status_code=404, detail="Address not found")
    for key, value in address.dict().items():
        setattr(db_addr, key, value)
    db.commit()
    db.refresh(db_addr)
    return db_addr

@router.delete("/{id}")
def delete_address(id: int, db: Session = Depends(get_db)):
    db_addr = db.query(Address).filter(Address.id == id).first()
    if not db_addr:
        raise HTTPException(status_code=404, detail="Address not found")
    db.delete(db_addr)
    db.commit()
    return {"detail": "Address deleted"}
