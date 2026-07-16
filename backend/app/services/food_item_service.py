from sqlalchemy.orm import Session

from app.models.food_item import FoodItem


def create_food_item(db: Session, food: FoodItem):
    db.add(food)
    db.commit()
    db.refresh(food)
    return food


def get_food_items(db: Session, restaurant_id: int):
    return (
        db.query(FoodItem)
        .filter(FoodItem.restaurant_id == restaurant_id)
        .all()
    )


def get_food_item(db: Session, item_id: int):
    return (
        db.query(FoodItem)
        .filter(FoodItem.id == item_id)
        .first()
    )


def delete_food_item(db: Session, item: FoodItem):
    db.delete(item)
    db.commit()

def update_food_item(
    db: Session,
    food_item: FoodItem,
):
    db.commit()
    db.refresh(food_item)
    return food_item