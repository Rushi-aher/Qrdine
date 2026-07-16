from sqlalchemy.orm import Session

from app.models.order import Order


def get_order(db: Session, order_id: int):
    return (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )


def get_restaurant_orders(db: Session, restaurant_id: int):
    return (
        db.query(Order)
        .filter(Order.restaurant_id == restaurant_id)
        .order_by(Order.created_at.desc())
        .all()
    )


def update_order(db: Session, order: Order):
    db.commit()
    db.refresh(order)
    return order

from sqlalchemy.orm import joinedload

from app.models.order import Order


def get_orders(db, restaurant_id: int):
    return (
        db.query(Order)
        .options(
            joinedload(Order.table),
            joinedload(Order.order_items).joinedload("food_item"),
        )
        .filter(Order.restaurant_id == restaurant_id)
        .order_by(Order.created_at.desc())
        .all()
    )