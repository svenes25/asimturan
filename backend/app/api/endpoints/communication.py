from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.communication import Communication
from ..schemas.communication import CommunicationCreate, CommunicationRead

router = APIRouter(prefix="/communication", tags=["communication"])

@router.get("/", response_model=list[CommunicationRead])
def get_communications(db: Session = Depends(get_db)):
    return db.query(Communication).all()

@router.get("/{id}", response_model=CommunicationRead)
def get_communication(id: int, db: Session = Depends(get_db)):
    comm = db.query(Communication).filter(Communication.id == id).first()
    if not comm:
        raise HTTPException(status_code=404, detail="Communication not found")
    return comm

@router.post("/", response_model=CommunicationRead)
def create_communication(comm: CommunicationCreate, db: Session = Depends(get_db)):
    db_comm = Communication(**comm.dict())
    db.add(db_comm)
    db.commit()
    db.refresh(db_comm)
    return db_comm

@router.put("/{id}", response_model=CommunicationRead)
def update_communication(id: int, comm: CommunicationCreate, db: Session = Depends(get_db)):
    db_comm = db.query(Communication).filter(Communication.id == id).first()
    if not db_comm:
        raise HTTPException(status_code=404, detail="Communication not found")
    for key, value in comm.dict().items():
        setattr(db_comm, key, value)
    db.commit()
    db.refresh(db_comm)
    return db_comm

@router.delete("/{id}")
def delete_communication(id: int, db: Session = Depends(get_db)):
    db_comm = db.query(Communication).filter(Communication.id == id).first()
    if not db_comm:
        raise HTTPException(status_code=404, detail="Communication not found")
    db.delete(db_comm)
    db.commit()
    return {"detail": "Communication deleted"}
