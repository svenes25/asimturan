from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.categories import Categories
from ..schemas.categories import CategoriesCreate, CategoriesRead

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[CategoriesRead])
def get_kategories(db: Session = Depends(get_db)):
    return db.query(Categories).all()
@router.put("/{id}", response_model=CategoriesRead)
def update_kategory(id: int, updated: CategoriesCreate, db: Session = Depends(get_db)):
    db_kategory = db.query(Categories).filter(Categories.id == id).first()
    if not db_kategory:
        raise HTTPException(status_code=404, detail="Category not found")

    db_kategory.name = updated.name
    db.commit()
    db.refresh(db_kategory)
    return db_kategory
@router.get("/{id}", response_model=CategoriesRead)
def get_kategory(id: int, db: Session = Depends(get_db)):
    category = db.query(Categories).filter(Categories.id == id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoriesRead)
def create_kategory(kategory: CategoriesCreate, db: Session = Depends(get_db)):
    db_kategory = Categories(**kategory.dict())
    db.add(db_kategory)
    db.commit()
    db.refresh(db_kategory)
    return db_kategory
@router.delete("/{id}")
def delete_kategory(id: int, db: Session = Depends(get_db)):
    db_kategory = db.query(Categories).filter(Categories.id == id).first()
    if not db_kategory:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_kategory)
    db.commit()
    return {"detail": "Category deleted"}
