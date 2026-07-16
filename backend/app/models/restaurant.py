from sqlalchemy import Column, ForeignKey, Integer, String, Text, Time
from sqlalchemy.orm import relationship

from app.database.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    name = Column(String(150), nullable=False)

    description = Column(Text)

    address = Column(Text, nullable=False)

    phone = Column(String(20), nullable=False)

    logo = Column(String(255))

    banner = Column(String(255))

    opening_time = Column(Time)

    closing_time = Column(Time)

    owner = relationship(
    "User",
    back_populates="restaurant",
    )
    
    tables = relationship(
    "RestaurantTable",
    back_populates="restaurant",
    cascade="all, delete",
    )

    categories = relationship(
    "Category",
    back_populates="restaurant",
    cascade="all, delete",
    )
    food_items = relationship(
    "FoodItem",
    back_populates="restaurant",
    cascade="all, delete",
    )
    orders = relationship(
    "Order",
    back_populates="restaurant",
    cascade="all, delete",
    )