from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.product_categories import ProductCategories
from ..schemas.product_categories import ProductCategoriesCreate, ProductCategoriesRead

router = APIRouter(prefix="/product_categories", tags=["product_categories"])

@router.get("/", response_model=list[ProductCategoriesRead])
def get_product_kategories(db: Session = Depends(get_db)):
    return db.query(ProductCategories).all()

@router.get("/{id}", response_model=ProductCategoriesRead)
def get_product_kategorie(id: int, db: Session = Depends(get_db)):
    pk = db.query(ProductCategories).filter(ProductCategories.id == id).first()
    if not pk:
        raise HTTPException(status_code=404, detail="ProductKategories not found")
    return pk

@router.post("/", response_model=ProductCategoriesRead)
def create_product_kategorie(pk: ProductCategoriesCreate, db: Session = Depends(get_db)):
    db_pk = ProductCategories(**pk.dict())
    db.add(db_pk)
    db.commit()
    db.refresh(db_pk)
    return db_pk

@router.put("/{id}", response_model=ProductCategoriesRead)
def update_product_kategorie(id: int, pk: ProductCategoriesCreate, db: Session = Depends(get_db)):
    db_pk = db.query(ProductCategories).filter(ProductCategories.id == id).first()
    if not db_pk:
        raise HTTPException(status_code=404, detail="ProductCategories not found")
    for key, value in pk.dict().items():
        setattr(db_pk, key, value)
    db.commit()
    db.refresh(db_pk)
    return db_pk

@router.delete("/{id}")
def delete_product_kategorie(id: int, db: Session = Depends(get_db)):
    db_pk = db.query(ProductCategories).filter(ProductCategories.id == id).first()
    if not db_pk:
        raise HTTPException(status_code=404, detail="ProductCategories not found")
    db.delete(db_pk)
    db.commit()
    return {"detail": "ProductCategories deleted"}
