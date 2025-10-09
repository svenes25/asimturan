import logging
import os
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import func
from sqlalchemy.orm import Session, aliased
from starlette.responses import JSONResponse

from ..database import get_db
from ..models.categories import Categories
from ..models.product import Product
from ..models.product_comments import ProductCommentsModel
from ..models.product_stars import ProductStarsModel
from ..models.product_categories import ProductCategories
from ..schemas.product import ProductCreate, ProductRead, ProductBase, ProductComments,ProductStars

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductBase])
def products_basic(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@router.get("/read", response_model=List[ProductRead])
def products_read(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []
    for p in products:
        category_rows = (
            db.query(Categories)
            .join(ProductCategories)
            .filter(ProductCategories.product_id == p.id)
            .all()
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
        })
    return result

@router.get("/stars", response_model=list[ProductStars])
def products_stars(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []
    for p in products:
        category_rows = (
            db.query(Categories)
            .join(ProductCategories)
            .filter(ProductCategories.product_id == p.id)
            .all()
        )
        stars_data = (
            db.query(
                func.count(ProductStarsModel.id).label("star_count"),
                func.avg(ProductStarsModel.stars).label("star_avg")
            )
            .filter(ProductStarsModel.product_id == p.id)
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

@router.get("/comments", response_model=List[ProductComments])
def products_comments(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []
    for p in products:
        category_rows = (
            db.query(Categories)
            .join(ProductCategories)
            .filter(ProductCategories.product_id == p.id)
            .all()
        )
        stars_data = (
            db.query(
                func.count(ProductStars.id).label("star_count"),
                func.avg(ProductStars.stars).label("star_avg"),
            )
            .filter(ProductStars.product_id == p.id)
            .first()
        )
        stars_alias = aliased(ProductStars)
        comments = (
            db.query(
                ProductComments.id.label("comment_id"),
                ProductComments.user_id,
                ProductComments.comment,
                ProductComments.created_at,
                stars_alias.stars.label("user_stars")  # yorum yapanın verdiği stars
            )
            .outerjoin(
                stars_alias,
                (ProductComments.user_id == stars_alias.user_id) &
                (stars_alias.product_id == product_id)
            )
            .filter(ProductComments.product_id == product_id)
            .all()
        )
        for comment in comments:
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
                "star_avg": round(float(stars_data.star_avg), 2) if stars_data.star_avg else 0.0,
                "user_id":comment.user_id,
                "user_name":comment.user_name,
                "user_surname":comment.user_surname,
                "user_comment":comment.comment,
                "user_star" : comment.star,
                "c_created_at":comment.created_at
            })
    return result

# Tek ürün getir
@router.get("/{product_id}", response_model=ProductComments)
def get_product(product_id: int, db: Session = Depends(get_db)):
    # Ürünü çek
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    category_rows = (
        db.query(Categories)
        .join(ProductCategories)
        .filter(ProductCategories.product_id == product_id)
        .all()
    )
    stars_data = (
        db.query(
            func.count(ProductStarsModel.id).label("star_count"),
            func.avg(ProductStarsModel.stars).label("star_avg"),
        )
        .filter(ProductStarsModel.product_id == product_id)
        .first()
    )

    stars_alias = aliased(ProductStarsModel)

    comments = (
        db.query(
            ProductCommentsModel.id.label("comment_id"),
            ProductCommentsModel.user_id,
            ProductCommentsModel.comment,
            ProductCommentsModel.created_at,
            stars_alias.stars.label("user_star"),
        )
        .outerjoin(
            stars_alias,
            (ProductCommentsModel.user_id == stars_alias.user_id) &
            (stars_alias.product_id == product_id)
        )
        .filter(ProductCommentsModel.product_id == product_id)
        .all()
    )
    # Tek ürün + ilişkili bilgiler
    result = {
        "id": product.id,
        "name": product.name,
        "price": float(product.price),
        "lower": product.lower,
        "limited_price": float(product.limited_price) if product.limited_price else None,
        "description": product.description,
        "image_url": product.image_url,
        "created_at": product.created_at,
        "updated_at": product.updated_at,
        "categories": category_rows,
        "star_count": stars_data.star_count or 0,
        "star_avg": round(float(stars_data.star_avg), 2) if stars_data.star_avg else 0.0,
        "comments": [
            {
                "comment_id": c.comment_id,
                "user_id": c.user_id,
                "comment": c.comment,
                "user_star": c.user_star,
                "created_at": c.created_at,
            }
            for c in comments
        ],
    }

    return result


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
