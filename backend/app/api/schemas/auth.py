from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    mail: EmailStr
    password: str

class LoginResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    mail: str
    tel: str | None = None
    role: str

    class Config:
        from_attributes = True

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    mail: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Config:
    from_attributes = True