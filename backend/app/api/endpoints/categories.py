from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.categories import Categories
from ..models.product_categories import ProductCategories
from ..schemas.categories import CategoriesCreate, CategoriesRead

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[CategoriesRead])
def get_categories(db: Session = Depends(get_db)):
    categories_with_count = (
        db.query(
            Categories.id,
            Categories.name,
            func.count(ProductCategories.product_id).label("product_count")
        )
        .outerjoin(ProductCategories, ProductCategories.categories_id == Categories.id)
        .group_by(Categories.id)
        .all()
    )
    return categories_with_count  # direk döndürüyoruz
def get_categories(db: Session = Depends(get_db)):
    categories_with_count = (
        db.query(
            Categories.id,
            Categories.name,
            func.count(ProductCategories.product_id).label("product_count")
        )
        .outerjoin(ProductCategories, ProductCategories.categories_id == Categories.id)
        .group_by(Categories.id)
        .all()
    )
    result = []
    for c in categories_with_count:
        result.append({
            "id": c.id,
            "name": c.name,
            "product_count": c.product_count
        })
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
