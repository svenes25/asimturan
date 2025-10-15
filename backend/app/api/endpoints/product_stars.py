from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.product_stars import ProductStarsModel
from ..schemas.product_stars import ProductStarsCreate, ProductStarsRead

router = APIRouter(prefix="/product_stars", tags=["product_stars"])

@router.get("/")
def get_product_stars(db: Session = Depends(get_db)):
    return db.query(ProductStarsModel).all()

@router.get("/{id}", response_model=ProductStarsRead)
def get_product_star(id: int, db: Session = Depends(get_db)):
    star = db.query(ProductStarsModel).filter(ProductStarsModel.id == id).first()
    if not star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    return star

@router.post("/")
def create_product_star(star: ProductStarsCreate, db: Session = Depends(get_db)):
    db_star = ProductStarsModel(**star.dict())
    db.add(db_star)
    db.commit()
    db.refresh(db_star)
    return db_star

@router.put("/{id}", response_model=ProductStarsRead)
def update_product_star(id: int, star: ProductStarsCreate, db: Session = Depends(get_db)):
    db_star = db.query(ProductStarsModel).filter(ProductStarsModel.id == id).first()
    if not db_star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    for key, value in star.dict().items():
        setattr(db_star, key, value)
    db.commit()
    db.refresh(db_star)
    return db_star

@router.delete("/{id}")
def delete_product_star(id: int, db: Session = Depends(get_db)):
    db_star = db.query(ProductStarsModel).filter(ProductStarsModel.id == id).first()
    if not db_star:
        raise HTTPException(status_code=404, detail="ProductStars not found")
    db.delete(db_star)
    db.commit()
    return {"detail": "ProductStars deleted"}
