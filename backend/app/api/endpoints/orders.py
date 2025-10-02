from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.orders import Orders
from ..schemas.orders import OrdersCreate, OrdersRead

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/", response_model=list[OrdersRead])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Orders).all()

@router.get("/{id}", response_model=OrdersRead)
def get_order(id: int, db: Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrdersRead)
def create_order(order: OrdersCreate, db: Session = Depends(get_db)):
    db_order = Orders(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/{id}", response_model=OrdersRead)
def update_order(id: int, order: OrdersCreate, db: Session = Depends(get_db)):
    db_order = db.query(Orders).filter(Orders.id == id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in order.dict().items():
        setattr(db_order, key, value)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.delete("/{id}")
def delete_order(id: int, db: Session = Depends(get_db)):
    db_order = db.query(Orders).filter(Orders.id == id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return {"detail": "Order deleted"}
