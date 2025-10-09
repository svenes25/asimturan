import logging
import os

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from ..database import get_db
from ..models.categories import Categories
from ..models.product import Product
from ..models.product_categories import ProductCategories
from ..models.product_stars import ProductStars
from ..schemas.product import ProductCreate, ProductRead, ProductBase

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[ProductRead])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []

    for p in products:
        category_rows = (
            db.query(Categories)
            .join(ProductCategories)
            .filter(ProductCategories.product_id == p.id)
            .all()
        )

        # Yıldız sayısı ve ortalama
        stars_data = (
            db.query(
                func.count(ProductStars.id).label("star_count"),
                func.avg(ProductStars.stars).label("star_avg"),
            )
            .filter(ProductStars.product_id == p.id)
            .first()
        )

        result.append({
            "id": p.id,
            "name": p.name,
            "price": float(p.price),
            "lower": p.lower,
            "limited_price": float(p.limited_price) if p.limited_price else None,
            "description": p.description,
            "image_url": p.image_url,
            "created_at": p.created_at,
            "updated_at": p.updated_at,
            "categories": category_rows,
            "star_count": stars_data.star_count or 0,
            "star_avg": round(float(stars_data.star_avg), 2) if stars_data.star_avg else 0.0
        })

    return result

# Tek ürün getir
@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return  product


@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(
        name=product.name,
        price=product.price,
        lower=product.lower,
        limited_price=product.limited_price,
        description=product.description,
        image_url=product.image_url
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    id=db_product.id
    for category_id in product.categoryIds:
        db_categories = ProductCategories(
                product_id=id,
                categories_id = category_id
        )
        db.add(db_categories)
    db.commit()
    db.refresh(db_product)
    return db_product

UPLOAD_DIR = r"C:\Users\Excalibur\Desktop\asimturan\asimturan\backend\app\api\static\images"
@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Dosya uzantısı kontrol
        ext = file.filename.split(".")[-1].lower()
        if ext not in ["jpg", "jpeg", "png", "gif"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Dosyayı backend/static/images içine kaydet
        save_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(save_path, "wb") as f:
            f.write(await file.read())

        # Public URL
        file_url = f"/static/images/{file.filename}"

        return JSONResponse(content={"message": "Upload successful", "url": file_url})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ürün güncelle
@router.put("/{product_id}", response_model=ProductRead)
def update_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in product.dict(exclude={"categoryIds"}).items():
        setattr(db_product, key, value)

    # Mevcut kategorileri sil
    db.query(ProductCategories).filter(ProductCategories.product_id == product_id).delete()

    # Yeni categoryIds ekle
    for category_id in product.categoryIds:
        db_categories = ProductCategories(
            product_id=product_id,
            categories_id=category_id
        )
        db.add(db_categories)

    db.commit()
    db.refresh(db_product)

    # Güncel kategorileri çek ve response'u dict olarak oluştur
    category_rows = db.query(Categories).join(ProductCategories).filter(ProductCategories.product_id == db_product.id).all()

    return {
        "id": db_product.id,
        "name": db_product.name,
        "price": float(db_product.price),
        "lower": db_product.lower,
        "limited_price": float(db_product.limited_price) if db_product.limited_price else None,
        "description": db_product.description,
        "image_url": db_product.image_url,
        "created_at": db_product.created_at,
        "updated_at": db_product.updated_at,
        "categories": [{"id": c.id, "name": c.name} for c in category_rows]
    }


# Ürün sil
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"detail": "Product deleted"}
