from fastapi import APIRouter, Depends, HTTPException, Body, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.users import User
from ..schemas.auth import RegisterRequest, LoginResponse
from ..schemas.users import UserCreate, UserRead, LoginRequest, UserUpdate, EmailPayload

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
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

@router.put("/{user_id}/password", response_model=UserRead)
def update_password(
    user_id: int,
    currentPassword: str = Body(...),
    newPassword: str = Body(...),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Mevcut şifre doğrulaması
    if user.password != currentPassword:
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    # Yeni şifreyi hashleyerek kaydet
    user.password = newPassword

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
@router.put("/admin")
def promote_to_admin(payload: EmailPayload, db: Session = Depends(get_db)):
    print("Gelen veri:", payload)
    user = db.query(User).filter(User.mail == payload.mail).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.role = payload.role
    db.commit()
    db.refresh(user)
    return user
@router.post("/login", response_model=UserRead)
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mail == data.mail, User.password == data.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user


@router.post("/login", response_model=UserRead)
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mail == email, User.password == password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in updated_user.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

@router.delete("/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted"}
