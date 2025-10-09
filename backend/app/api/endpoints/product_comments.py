from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.product_comments import ProductCommentsCreate, ProductCommentsRead

router = APIRouter(prefix="/product_comments", tags=["product_comments"])
#
# @router.get("/", response_model=list[ProductCommentsRead])
# def get_product_comments(db: Session = Depends(get_db)):
#     return db.query(ProductComments).all()
#
# @router.get("/{id}", response_model=ProductCommentsRead)
# def get_product_comment(id: int, db: Session = Depends(get_db)):
#     comment = db.query(ProductComments).filter(ProductComments.id == id).first()
#     if not comment:
#         raise HTTPException(status_code=404, detail="ProductComments not found")
#     return comment
#
# @router.post("/", response_model=ProductCommentsRead)
# def create_product_comment(comment: ProductCommentsCreate, db: Session = Depends(get_db)):
#     db_comment = ProductComments(**comment.dict())
#     db.add(db_comment)
#     db.commit()
#     db.refresh(db_comment)
#     return db_comment
#
# @router.put("/{id}", response_model=ProductCommentsRead)
# def update_product_comment(id: int, comment: ProductCommentsCreate, db: Session = Depends(get_db)):
#     db_comment = db.query(ProductComments).filter(ProductComments.id == id).first()
#     if not db_comment:
#         raise HTTPException(status_code=404, detail="ProductComments not found")
#     for key, value in comment.dict().items():
#         setattr(db_comment, key, value)
#     db.commit()
#     db.refresh(db_comment)
#     return db_comment
#
# @router.delete("/{id}")
# def delete_product_comment(id: int, db: Session = Depends(get_db)):
#     db_comment = db.query(ProductComments).filter(ProductComments.id == id).first()
#     if not db_comment:
#         raise HTTPException(status_code=404, detail="ProductComments not found")
#     db.delete(db_comment)
#     db.commit()
#     return {"detail": "ProductComments deleted"}
