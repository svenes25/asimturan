from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from ..database import get_db
from ..models.product import Product
from ..schemas.product import ProductCreate, ProductRead

router = APIRouter(prefix="/products", tags=["products"])


# Tüm ürünleri getir
@router.get("/", response_model=list[ProductRead])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()


# Tek ürün getir
@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# Yeni ürün ekle (görsel dahil)
@router.post("/", response_model=ProductRead)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

UPLOAD_DIR = "backend/app/static/images"
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

    for key, value in product.dict().items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product


# Ürün sil
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"detail": "Product deleted"}
