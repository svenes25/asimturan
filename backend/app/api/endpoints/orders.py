import logging
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload
from ..database import get_db
from ..models.order_details import OrderDetails
from ..models.orders import Orders
from ..models.product import Product
from ..models.users import User
from ..schemas.orders import OrdersCreate, OrdersRead, OrdersUpdate

router = APIRouter(prefix="/orders", tags=["orders"])
@router.get("/")
def get_orders_read(db: Session = Depends(get_db)):
    orders = db.query(Orders).all()
    result = []

    for o in orders:
        # User bilgilerini çek
        user = db.query(User).filter(User.id == o.user_id).first()

        # OrderDetails ve product bilgilerini çek
        details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == o.id).all()
        details = []
        for d in details_raw:
            product = db.query(Product).filter(Product.id == d.product_id).first()
            details.append({
                "product_id": d.product_id,
                "piece": d.piece,
                "price": d.price,
                "name": product.name if product else None,
                "image": product.image_url if product else None
            })

        result.append({
            "id": o.id,
            "user_id": o.user_id,
            "user_name": user.name if user else None,
            "user_surname": user.surname if user else None,
            "user_email": user.mail if user else None,
            "user_tel": user.tel if user else None,
            "user_address": user.addresses if user else None,
            "time": o.time,
            "status": o.status,
            "status_detail": o.status_detail,
            "detail": details
        })

    return result
@router.get("/total-earnings")
def get_total_earnings(db: Session = Depends(get_db)):
    total = (
        db.query(func.sum(OrderDetails.price * OrderDetails.piece))
        .scalar()
    )
    return float(total or 0)
@router.get("/{id}")
def get_order(id: int, db: Session = Depends(get_db)):
    # 1. Siparişi bul
    db_order = db.query(Orders).filter(Orders.id == id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    user = db.query(User).filter(User.id == db_order.user_id).first()
    details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == db_order.id).all()
    details = []
    for d in details_raw:
        product = db.query(Product).filter(Product.id == d.product_id).first()
        details.append({
            "product_id": d.product_id,
            "piece": d.piece,
            "price": d.price,
            "name": product.name if product else None,
            "image": product.image_url if product else None
        })

    return {
        "id": db_order.id,
        "user_id": db_order.user_id,
        "user_name": user.name if user else None,
        "user_surname": user.surname if user else None,
        "user_email": user.mail if user else None,
        "user_tel": user.tel if user else None,
        "user_address": user.addresses if user else None,
        "time": db_order.time,
        "status": db_order.status,
        "status_detail": db_order.status_detail,
        "detail": details
    }


@router.post("/")
def create_order(order: OrdersCreate, db: Session = Depends(get_db)):
    try:
        db_order = Orders(
            user_id=order.user_id,
            time=order.time,
            status="Beklemede",
            status_detail=order.status_detail
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)

        for item in order.detail:
            db_detail = OrderDetails(
                order_id=db_order.id,
                product_id=item.product_id,
                piece=item.piece,
                price=item.price
            )
            db.add(db_detail)
        db.commit()

        # 3️⃣ Son olarak Order’ı dön
        db.refresh(db_order)
        return db_order

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Sipariş oluşturulamadı: {e}")

@router.put("/{id}")
def update_order(id: int, order_update: OrdersUpdate, db: Session = Depends(get_db)):
    # 1. Siparişi bul
    db_order = db.query(Orders).filter(Orders.id == id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    # 2. Sadece gönderilen alanları güncelle
    for key, value in order_update.dict(exclude_unset=True).items():
        setattr(db_order, key, value)

    db.commit()
    db.refresh(db_order)

    # 3. User bilgilerini çek
    user = db.query(User).filter(User.id == db_order.user_id).first()

    # 4. OrderDetails ve Product bilgilerini çek
    details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == db_order.id).all()
    details = []
    for d in details_raw:
        product = db.query(Product).filter(Product.id == d.product_id).first()
        details.append({
            "product_id": d.product_id,
            "piece": d.piece,
            "price": d.price,
            "name": product.name if product else None,
            "image": product.image_url if product else None
        })

    # 5. Response'u istediğin formatta dön
    return {
        "id": db_order.id,
        "user_id": db_order.user_id,
        "user_name": user.name if user else None,
        "user_surname": user.surname if user else None,
        "user_email": user.mail if user else None,
        "user_tel": user.tel if user else None,
        "user_address": user.addresses if user else None,
        "time": db_order.time,
        "status": db_order.status,
        "status_detail": db_order.status_detail,
        "detail": details
    }


@router.delete("/{id}")
def delete_order(id: int, db: Session = Depends(get_db)):
    db_order = db.query(Orders).filter(Orders.id == id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return {"detail": "Order deleted"}
