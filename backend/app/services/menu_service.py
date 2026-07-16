from sqlalchemy.orm import Session

from app.models.restaurant import Restaurant
from app.models.table import RestaurantTable


def get_table(db: Session, table_id: int):
    return (
        db.query(RestaurantTable)
        .filter(RestaurantTable.id == table_id)
        .first()
    )


def get_restaurant(db: Session, restaurant_id: int):
    return (
        db.query(Restaurant)
        .filter(Restaurant.id == restaurant_id)
        .first()
    )