from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class RestaurantTable(Base):
    __tablename__ = "restaurant_tables"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    table_number = Column(
        Integer,
        nullable=False,
    )

    qr_code = Column(
        String(500),
        nullable=False,
    )

    restaurant = relationship(
        "Restaurant",
        back_populates="tables",
    )

    orders = relationship(
        "Order",
        back_populates="table",
        cascade="all, delete",
    )