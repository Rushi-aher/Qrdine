from sqlalchemy.orm import Session

from app.models.restaurant import Restaurant
from app.schemas.restaurant import RestaurantCreate, RestaurantUpdate


def get_restaurant_by_owner(db: Session, owner_id: int):
    return (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == owner_id)
        .first()
    )


def create_restaurant(
    db: Session,
    owner_id: int,
    restaurant: RestaurantCreate,
):
    db_restaurant = Restaurant(
        owner_id=owner_id,
        **restaurant.model_dump(),
    )

    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)

    return db_restaurant


def update_restaurant(
    db: Session,
    restaurant: Restaurant,
    data: RestaurantUpdate,
):
    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(restaurant, key, value)

    db.commit()
    db.refresh(restaurant)

    return restaurant


def delete_restaurant(
    db: Session,
    restaurant: Restaurant,
):
    db.delete(restaurant)
    db.commit()

def update_restaurant(
    db: Session,
    restaurant: Restaurant,
):
    db.commit()
    db.refresh(restaurant)
    return restaurant