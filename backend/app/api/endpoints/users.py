from fastapi import APIRouter, Depends, HTTPException, Body, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.order_details import OrderDetails
from ..models.orders import Orders
from ..models.product import Product
from ..models.product_comments import ProductCommentsModel
from ..models.product_stars import ProductStarsModel
from ..models.users import User
from ..schemas.auth import RegisterRequest, LoginResponse
from ..schemas.users import UserBase, UserRead, LoginRequest, UserUpdate, EmailPayload

router = APIRouter(prefix="/users", tags=["users"])
@router.get("/", response_model=list[UserBase])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user_orm = db.query(User).filter(User.id == user_id).first()
    if not user_orm:
        raise HTTPException(status_code=404, detail="User not found")

    addresses_list = []
    if hasattr(user_orm, 'addresses') and user_orm.addresses:
        for address in user_orm.addresses:
            addresses_list.append({k: v for k, v in address.__dict__.items() if not k.startswith('_')})

    payments_list = []
    if hasattr(user_orm, 'payments') and user_orm.payments:
        for payment in user_orm.payments:
            payments_list.append({k: v for k, v in payment.__dict__.items() if not k.startswith('_')})

    user_data = {
        "id": user_orm.id,
        "name": user_orm.name,
        "surname": user_orm.surname,
        "tel": user_orm.tel,
        "mail": user_orm.mail,
        "role": user_orm.role,
        "created_at": user_orm.created_at,
        "updated_at": user_orm.updated_at,
        "addresses": addresses_list,
        "payments": payments_list,
    }

    orders_orm = db.query(Orders).filter(Orders.user_id == user_id).all()
    orders_list = []

    for o in orders_orm:
        details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == o.id).all()
        details = []
        total_price = 0.0

        for d in details_raw:
            product = db.query(Product).filter(Product.id == d.product_id).first()
            item_total = float(d.piece) * float(d.price)
            total_price += item_total
            # Kullanıcının ürün için verdiği star ve comment
            star_obj = db.query(ProductStarsModel).filter(
                ProductStarsModel.user_id == user_id,
                ProductStarsModel.product_id == d.product_id
            ).first()
            comment_obj = db.query(ProductCommentsModel).filter(
                ProductCommentsModel.user_id == user_id,
                ProductCommentsModel.product_id == d.product_id
            ).first()

            details.append({
                "product_id": d.product_id,
                "piece": d.piece,
                "price": d.price,
                "product_name": product.name if product else None,
                "stars": star_obj.stars if star_obj else None,
                "comment": comment_obj.comment if comment_obj else None,
            })

        orders_list.append({
            "id": o.id,
            "detail": details,
            "time": o.time,
            "status": o.status,
            "status_detail": o.status_detail,
            "total": total_price,
        })

    user_data["orders"] = orders_list
    return user_data
@router.put("/{user_id}/password")
def update_password(user_id: int,currentPassword: str = Body(...),newPassword: str = Body(...),db: Session = Depends(get_db),):
    user_orm = db.query(User).filter(User.id == user_id).first()
    if not user_orm:
        raise HTTPException(status_code=404, detail="User not found")
    if user_orm.password != currentPassword:
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    user_orm.password = newPassword
    db.add(user_orm)
    db.commit()
    db.refresh(user_orm)
    addresses_list = []
    if hasattr(user_orm, 'addresses') and user_orm.addresses:
        for address in user_orm.addresses:
            addresses_list.append({k: v for k, v in address.__dict__.items() if not k.startswith('_')})

    payments_list = []
    if hasattr(user_orm, 'payments') and user_orm.payments:
        for payment in user_orm.payments:
            payments_list.append({k: v for k, v in payment.__dict__.items() if not k.startswith('_')})

    user_data = {
        "id": user_orm.id,
        "name": user_orm.name,
        "surname": user_orm.surname,
        "tel": user_orm.tel,
        "mail": user_orm.mail,
        "role": user_orm.role,
        "created_at": user_orm.created_at,
        "updated_at": user_orm.updated_at,
        "addresses": addresses_list,
        "payments": payments_list,
    }

    orders_orm = db.query(Orders).filter(Orders.user_id == user_id).all()
    orders_list = []

    for o in orders_orm:
        details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == o.id).all()
        details = []
        total_price = 0.0

        for d in details_raw:
            product = db.query(Product).filter(Product.id == d.product_id).first()
            item_total = float(d.piece) * float(d.price)
            total_price += item_total

            # Kullanıcının ürün için verdiği star ve comment
            star_obj = db.query(ProductStarsModel).filter(
                ProductStarsModel.user_id == user_id,
                ProductStarsModel.product_id == d.product_id
            ).first()
            comment_obj = db.query(ProductCommentsModel).filter(
                ProductCommentsModel.user_id == user_id,
                ProductCommentsModel.product_id == d.product_id
            ).first()

            details.append({
                "product_id": d.product_id,
                "piece": d.piece,
                "price": d.price,
                "product_name": product.name if product else None,
                "stars": star_obj.stars if star_obj else None,
                "comment": comment_obj.comment if comment_obj else None,
            })

        orders_list.append({
            "id": o.id,
            "detail": details,
            "time": o.time,
            "status": o.status,
            "status_detail": o.status_detail,
            "total": total_price,
        })

    user_data["orders"] = orders_list
    return user_data
@router.post("/register", response_model=LoginResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.mail == data.mail).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email zaten kayıtlı")

    user = User(
        name=data.first_name,
        surname=data.last_name,
        mail=data.mail,
        password=data.password,
        role="user"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return LoginResponse(
        id=user.id,
        first_name=user.name,
        last_name=user.surname,
        mail=user.mail,
        tel=user.tel,
        role=user.role
    )
@router.post("/login")
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mail == data.mail, User.password == data.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
@router.put("/admin")
def promote_to_admin(payload: EmailPayload, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mail == payload.mail).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.role = payload.role
    db.commit()
    db.refresh(user)
    return user
@router.put("/{user_id}")
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user_orm = db.query(User).filter(User.id == user_id).first()
    if not user_orm:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in updated_user.dict(exclude_unset=True).items():
        setattr(user_orm, key, value)
    db.commit()
    db.refresh(user_orm)
    addresses_list = []
    if hasattr(user_orm, 'addresses') and user_orm.addresses:
        for address in user_orm.addresses:
            addresses_list.append({k: v for k, v in address.__dict__.items() if not k.startswith('_')})

    payments_list = []
    if hasattr(user_orm, 'payments') and user_orm.payments:
        for payment in user_orm.payments:
            payments_list.append({k: v for k, v in payment.__dict__.items() if not k.startswith('_')})

    user_data = {
        "id": user_orm.id,
        "name": user_orm.name,
        "surname": user_orm.surname,
        "tel": user_orm.tel,
        "mail": user_orm.mail,
        "role": user_orm.role,
        "created_at": user_orm.created_at,
        "updated_at": user_orm.updated_at,
        "addresses": addresses_list,
        "payments": payments_list,
    }

    orders_orm = db.query(Orders).filter(Orders.user_id == user_id).all()
    orders_list = []

    for o in orders_orm:
        details_raw = db.query(OrderDetails).filter(OrderDetails.order_id == o.id).all()
        details = []
        total_price = 0.0

        for d in details_raw:
            product = db.query(Product).filter(Product.id == d.product_id).first()
            item_total = float(d.piece) * float(d.price)
            total_price += item_total

            # Kullanıcının ürün için verdiği star ve comment
            star_obj = db.query(ProductStarsModel).filter(
                ProductStarsModel.user_id == user_id,
                ProductStarsModel.product_id == d.product_id
            ).first()
            comment_obj = db.query(ProductCommentsModel).filter(
                ProductCommentsModel.user_id == user_id,
                ProductCommentsModel.product_id == d.product_id
            ).first()

            details.append({
                "product_id": d.product_id,
                "piece": d.piece,
                "price": d.price,
                "product_name": product.name if product else None,
                "stars": star_obj.stars if star_obj else None,
                "comment": comment_obj.comment if comment_obj else None,
            })

        orders_list.append({
            "id": o.id,
            "detail": details,
            "time": o.time,
            "status": o.status,
            "status_detail": o.status_detail,
            "total": total_price,
        })

    user_data["orders"] = orders_list
    return user_data
@router.delete("/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted"}
