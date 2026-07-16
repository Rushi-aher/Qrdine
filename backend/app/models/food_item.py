from sqlalchemy import (
    Boolean,
    Column,
    Float,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class FoodItem(Base):
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    name = Column(String, nullable=False)

    description = Column(String)

    price = Column(Float, nullable=False)

    image = Column(String)

    available_quantity = Column(Integer, default=0)

    is_available = Column(Boolean, default=True)

    restaurant = relationship(
        "Restaurant",
        back_populates="food_items",
    )

    category = relationship(
        "Category",
        back_populates="food_items",
    )