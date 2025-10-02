from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.product_kategories import ProductKategories
from ..schemas.product_kategories import ProductKategoriesCreate, ProductKategoriesRead

router = APIRouter(prefix="/product_kategories", tags=["product_kategories"])

@router.get("/", response_model=list[ProductKategoriesRead])
def get_product_kategories(db: Session = Depends(get_db)):
    return db.query(ProductKategories).all()

@router.get("/{id}", response_model=ProductKategoriesRead)
def get_product_kategorie(id: int, db: Session = Depends(get_db)):
    pk = db.query(ProductKategories).filter(ProductKategories.id == id).first()
    if not pk:
        raise HTTPException(status_code=404, detail="ProductKategories not found")
    return pk

@router.post("/", response_model=ProductKategoriesRead)
def create_product_kategorie(pk: ProductKategoriesCreate, db: Session = Depends(get_db)):
    db_pk = ProductKategories(**pk.dict())
    db.add(db_pk)
    db.commit()
    db.refresh(db_pk)
    return db_pk

@router.put("/{id}", response_model=ProductKategoriesRead)
def update_product_kategorie(id: int, pk: ProductKategoriesCreate, db: Session = Depends(get_db)):
    db_pk = db.query(ProductKategories).filter(ProductKategories.id == id).first()
    if not db_pk:
        raise HTTPException(status_code=404, detail="ProductKategories not found")
    for key, value in pk.dict().items():
        setattr(db_pk, key, value)
    db.commit()
    db.refresh(db_pk)
    return db_pk

@router.delete("/{id}")
def delete_product_kategorie(id: int, db: Session = Depends(get_db)):
    db_pk = db.query(ProductKategories).filter(ProductKategories.id == id).first()
    if not db_pk:
        raise HTTPException(status_code=404, detail="ProductKategories not found")
    db.delete(db_pk)
    db.commit()
    return {"detail": "ProductKategories deleted"}
