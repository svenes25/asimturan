from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.payment import Payment
from ..schemas.payment import PaymentCreate, PaymentRead, PaymentUpdate

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/", response_model=list[PaymentRead])
def get_payments(db: Session = Depends(get_db)):
    return db.query(Payment).all()

@router.get("/{id}", response_model=PaymentRead)
def get_payment(id: int, db: Session = Depends(get_db)):
    pay = db.query(Payment).filter(Payment.id == id).first()
    if not pay:
        raise HTTPException(status_code=404, detail="Payment not found")
    return pay

@router.post("/", response_model=PaymentRead)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    db_pay = Payment(**payment.dict())
    db.add(db_pay)
    db.commit()
    db.refresh(db_pay)
    return db_pay

@router.put("/user/{user_id}", response_model=PaymentRead)
def update_or_create_payment(user_id: int, updated_payment: PaymentUpdate, db: Session = Depends(get_db)):
    # Var olan payment'i bul
    payment = db.query(Payment).filter(Payment.user_id == user_id).first()

    if payment:
        # Eğer varsa, alanları güncelle
        for key, value in updated_payment.dict(exclude_unset=True).items():
            setattr(payment, key, value)
    else:
        # Yoksa yeni oluştur
        payment_data = updated_payment.dict()
        payment = Payment(user_id=user_id, **payment_data)
        db.add(payment)

    db.commit()
    db.refresh(payment)
    return payment
@router.delete("/{id}")
def delete_payment(id: int, db: Session = Depends(get_db)):
    db_pay = db.query(Payment).filter(Payment.id == id).first()
    if not db_pay:
        raise HTTPException(status_code=404, detail="Payment not found")
    db.delete(db_pay)
    db.commit()
    return {"detail": "Payment deleted"}
