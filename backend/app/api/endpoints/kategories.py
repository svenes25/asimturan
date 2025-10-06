from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.kategories import Kategories
from ..schemas.kategories import KategoriesCreate, KategoriesRead

router = APIRouter(prefix="/kategories", tags=["kategories"])

@router.get("/", response_model=list[KategoriesRead])
def get_kategories(db: Session = Depends(get_db)):
    return db.query(Kategories).all()
@router.put("/{id}", response_model=KategoriesRead)
def update_kategory(id: int, updated: KategoriesCreate, db: Session = Depends(get_db)):
    db_kategory = db.query(Kategories).filter(Kategories.id == id).first()
    if not db_kategory:
        raise HTTPException(status_code=404, detail="Category not found")

    db_kategory.name = updated.name
    db.commit()
    db.refresh(db_kategory)
    return db_kategory
@router.get("/{id}", response_model=KategoriesRead)
def get_kategory(id: int, db: Session = Depends(get_db)):
    category = db.query(Kategories).filter(Kategories.id == id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=KategoriesRead)
def create_kategory(kategory: KategoriesCreate, db: Session = Depends(get_db)):
    db_kategory = Kategories(**kategory.dict())
    db.add(db_kategory)
    db.commit()
    db.refresh(db_kategory)
    return db_kategory
@router.delete("/{id}")
def delete_kategory(id: int, db: Session = Depends(get_db)):
    db_kategory = db.query(Kategories).filter(Kategories.id == id).first()
    if not db_kategory:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_kategory)
    db.commit()
    return {"detail": "Category deleted"}
