from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    password = Column(String, nullable=False)

    role = Column(String, nullable=False)

    is_active = Column(Boolean, default=True)

    restaurant = relationship(
        "Restaurant",
        back_populates="owner",
        uselist=False,
    )
    products = relationship(
        "Product",
        back_populates="owner"
    )