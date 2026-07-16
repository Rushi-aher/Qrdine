import os

import qrcode
from sqlalchemy.orm import Session

from app.models.restaurant import Restaurant
from app.models.table import RestaurantTable


QR_FOLDER = "static/qrcodes"


os.makedirs(QR_FOLDER, exist_ok=True)


def create_table(
    db: Session,
    restaurant: Restaurant,
    table_number: int,
):
    existing = (
        db.query(RestaurantTable)
        .filter(
            RestaurantTable.restaurant_id == restaurant.id,
            RestaurantTable.table_number == table_number,
        )
        .first()
    )

    if existing:
        return None

    qr_data = (
        f"http://localhost:5173/menu/"
        f"{restaurant.id}/{table_number}"
    )

    filename = (
        f"restaurant_{restaurant.id}"
        f"_table_{table_number}.png"
    )

    filepath = os.path.join(
        QR_FOLDER,
        filename,
    )

    img = qrcode.make(qr_data)
    img.save(filepath)

    table = RestaurantTable(
        restaurant_id=restaurant.id,
        table_number=table_number,
        qr_code=filepath,
    )

    db.add(table)
    db.commit()
    db.refresh(table)

    return table


def get_tables(
    db: Session,
    restaurant_id: int,
):
    return (
        db.query(RestaurantTable)
        .filter(
            RestaurantTable.restaurant_id == restaurant_id
        )
        .order_by(RestaurantTable.table_number)
        .all()
    )

def get_table(
    db: Session,
    table_id: int,
):
    return (
        db.query(RestaurantTable)
        .filter(RestaurantTable.id == table_id)
        .first()
    )


def update_table(
    db: Session,
    table: RestaurantTable,
):
    db.commit()
    db.refresh(table)
    return table


def delete_table(
    db: Session,
    table: RestaurantTable,
):
    db.delete(table)
    db.commit()