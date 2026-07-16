from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    name = Column(String(100), nullable=False)

    description = Column(String(500), nullable=True)

    restaurant = relationship(
        "Restaurant",
        back_populates="categories",
    )
    food_items = relationship(
    "FoodItem",
    back_populates="category",
    cascade="all, delete",
    )