from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.order_details import OrderDetails
from ..schemas.order_details import OrderDetailsCreate, OrderDetailsRead

router = APIRouter(prefix="/order_details", tags=["order_details"])

@router.get("/", response_model=list[OrderDetailsRead])
def get_order_details(db: Session = Depends(get_db)):
    return db.query(OrderDetails).all()

@router.get("/{id}", response_model=OrderDetailsRead)
def get_order_detail(id: int, db: Session = Depends(get_db)):
    detail = db.query(OrderDetails).filter(OrderDetails.id == id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="OrderDetails not found")
    return detail

@router.post("/", response_model=OrderDetailsRead)
def create_order_detail(detail: OrderDetailsCreate, db: Session = Depends(get_db)):
    db_detail = OrderDetails(**detail.dict())
    db.add(db_detail)
    db.commit()
    db.refresh(db_detail)
    return db_detail

@router.put("/{id}", response_model=OrderDetailsRead)
def update_order_detail(id: int, detail: OrderDetailsCreate, db: Session = Depends(get_db)):
    db_detail = db.query(OrderDetails).filter(OrderDetails.id == id).first()
    if not db_detail:
        raise HTTPException(status_code=404, detail="OrderDetails not found")
    for key, value in detail.dict().items():
        setattr(db_detail, key, value)
    db.commit()
    db.refresh(db_detail)
    return db_detail

@router.delete("/{id}")
def delete_order_detail(id: int, db: Session = Depends(get_db)):
    db_detail = db.query(OrderDetails).filter(OrderDetails.id == id).first()
    if not db_detail:
        raise HTTPException(status_code=404, detail="OrderDetails not found")
    db.delete(db_detail)
    db.commit()
    return {"detail": "OrderDetails deleted"}
