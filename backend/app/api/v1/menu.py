from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.category import Category
from app.models.food_item import FoodItem

from app.schemas.menu import (
    MenuCategory,
    MenuFoodItem,
    MenuResponse,
    RestaurantInfo,
    TableInfo,
)

from app.services.menu_service import (
    get_restaurant,
    get_table,
)

router = APIRouter(
    prefix="/menu",
    tags=["Customer Menu"],
)


@router.get("/{table_id}", response_model=MenuResponse)
def get_menu(
    table_id: int,
    db: Session = Depends(get_db),
):
    table = get_table(db, table_id)

    if table is None:
        raise HTTPException(
            status_code=404,
            detail="Table not found",
        )

    restaurant = get_restaurant(
        db,
        table.restaurant_id,
    )

    if restaurant is None:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    categories = (
        db.query(Category)
        .filter(Category.restaurant_id == restaurant.id)
        .all()
    )

    menu_categories = []

    for category in categories:

        food_items = (
            db.query(FoodItem)
            .filter(
                FoodItem.category_id == category.id,
                FoodItem.is_available == True,
            )
            .all()
        )

        menu_categories.append(
            MenuCategory(
                id=category.id,
                name=category.name,
                description=category.description,
                items=[
                    MenuFoodItem.model_validate(item)
                    for item in food_items
                ],
            )
        )

    return MenuResponse(
        restaurant=RestaurantInfo(
            id=restaurant.id,
            name=restaurant.name,
            logo=restaurant.logo,
            banner=restaurant.banner,
        ),
        table=TableInfo(
            id=table.id,
            table_number=table.table_number,
        ),
        categories=menu_categories,
    )