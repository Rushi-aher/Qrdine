from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    price = Column(
        Float,
        nullable=False
    )

    image = Column(
        String,
        nullable=True
    )

    stock = Column(
        Integer,
        default=0
    )

    available = Column(
        Boolean,
        default=True
    )

    category = Column(
        String,
        nullable=False
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
        "User",
        back_populates="products"
    )