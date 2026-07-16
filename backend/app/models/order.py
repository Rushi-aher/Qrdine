from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    func,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    table_id = Column(
        Integer,
        ForeignKey("restaurant_tables.id"),
        nullable=False,
    )

    customer_name = Column(String(100))

    status = Column(
    String(20),
    nullable=False,
    default="PENDING",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    restaurant = relationship(
        "Restaurant",
        back_populates="orders",
    )

    table = relationship(
        "RestaurantTable",
        back_populates="orders",
    )

    order_items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete",
    )