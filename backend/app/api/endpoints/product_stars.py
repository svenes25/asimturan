from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.product_stars import ProductStars
from ..schemas.product_stars import ProductStarsCreate, ProductStarsRead

router = APIRouter(prefix="/product_stars", tags=["product_stars"])

@router.get("/", response_model=list[ProductStarsRead])
def get_product_stars(db: Session = Depends(get_db)):
    return db.query(ProductStars).all()

@router.get("/{id}", response_model=ProductStarsRead)
def get_product_star(id: int, db: Session = Depends(get_db)):
    star = db.query(ProductStars).filter(ProductStars.id == id).first()
    if not star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    return star

@router.post("/", response_model=ProductStarsRead)
def create_product_star(star: ProductStarsCreate, db: Session = Depends(get_db)):
    db_star = ProductStars(**star.dict())
    db.add(db_star)
    db.commit()
    db.refresh(db_star)
    return db_star

@router.put("/{id}", response_model=ProductStarsRead)
def update_product_star(id: int, star: ProductStarsCreate, db: Session = Depends(get_db)):
    db_star = db.query(ProductStars).filter(ProductStars.id == id).first()
    if not db_star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    for key, value in star.dict().items():
        setattr(db_star, key, value)
    db.commit()
    db.refresh(db_star)
    return db_star

@router.delete("/{id}")
def delete_product_star(id: int, db: Session = Depends(get_db)):
    db_star = db.query(ProductStars).filter(ProductStars.id == id).first()
    if not db_star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    db.delete(db_star)
    db.commit()
    return {"detail": "ProductStars deleted"}
