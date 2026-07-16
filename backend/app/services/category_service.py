from sqlalchemy.orm import Session

from app.models.category import Category
from app.models.restaurant import Restaurant


def create_category(
    db: Session,
    restaurant: Restaurant,
    name: str,
    description: str | None,
):
    category = Category(
        restaurant_id=restaurant.id,
        name=name,
        description=description,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


def get_categories(
    db: Session,
    restaurant_id: int,
):
    return (
        db.query(Category)
        .filter(Category.restaurant_id == restaurant_id)
        .order_by(Category.name)
        .all()
    )

def get_category(
    db: Session,
    category_id: int,
):
    return (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

def update_category(
    db: Session,
    category: Category,
):
    db.commit()
    db.refresh(category)
    return category

def delete_category(
    db: Session,
    category: Category,
):
    db.delete(category)
    db.commit()