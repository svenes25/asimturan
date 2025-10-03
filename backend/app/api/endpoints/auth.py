from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from ..database import get_db
from ..models.users import User
from ..schemas.auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    # email ile kullanıcıyı bul
    user = db.query(User).filter(User.mail == payload.mail).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # bcrypt ile doğrula
    if not bcrypt.verify(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # role alanını string olarak dönecek (zaten User.role string ise aynı kalır)
    # Eğer DB'de role sayısal (1/0) ise burada stringe çevir:
    role_val = user.role
    if role_val in (1, "1"):
        role_str = "admin"
    elif role_val in (0, "0"):
        role_str = "user"
    else:
        role_str = str(role_val)
    user.role = role_str
    return user
