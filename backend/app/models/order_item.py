from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False,
    )

    food_item_id = Column(
        Integer,
        ForeignKey("food_items.id"),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    order = relationship(
        "Order",
        back_populates="order_items",
    )

    food_item = relationship("FoodItem")