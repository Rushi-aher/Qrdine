from pydantic import BaseModel, EmailStr
from typing import Literal


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal["owner", "customer"]


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str