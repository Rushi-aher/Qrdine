from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required

from app.models.category import Category
from app.models.food_item import FoodItem
from app.models.restaurant import Restaurant

from app.schemas.food_item import (
    FoodItemResponse,
    FoodItemUpdate,
)

from app.services.food_item_service import (
    create_food_item,
    delete_food_item,
    get_food_item,
    get_food_items,
    update_food_item,
)

from app.utils.file_upload import save_image

router = APIRouter(
    prefix="/food-items",
    tags=["Food Items"],
)


@router.post("", response_model=FoodItemResponse)
def add_food_item(
    category_id: int = Form(...),
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    available_quantity: int = Form(...),
    is_available: bool = Form(True),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    if restaurant is None:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    category = (
        db.query(Category)
        .filter(
            Category.id == category_id,
            Category.restaurant_id == restaurant.id,
        )
        .first()
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    image_path = save_image(image)

    item = FoodItem(
        restaurant_id=restaurant.id,
        category_id=category_id,
        name=name,
        description=description,
        price=price,
        image=image_path,
        available_quantity=available_quantity,
        is_available=is_available,
    )

    item = create_food_item(db, item)

    return {
    "id": item.id,
    "restaurant_id": item.restaurant_id,
    "category_id": item.category_id,
    "category": item.category.name,
    "name": item.name,
    "description": item.description,
    "price": item.price,
    "image": item.image,
    "available_quantity": item.available_quantity,
    "is_available": item.is_available,
}


@router.get("", response_model=list[FoodItemResponse])
def list_food_items(
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):

    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    if restaurant is None:

        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    items = get_food_items(
        db,
        restaurant.id,
    )

    return [

        {
            "id": item.id,
            "restaurant_id": item.restaurant_id,
            "category_id": item.category_id,
            "category": item.category.name,
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "image": item.image,
            "available_quantity": item.available_quantity,
            "is_available": item.is_available,
        }

        for item in items

    ]

@router.put("/{item_id}", response_model=FoodItemResponse)
def edit_food_item(
    item_id: int,
    category_id: int = Form(...),
    name: str = Form(...),
    description: str = Form(""),
    price: float = Form(...),
    available_quantity: int = Form(...),
    is_available: bool = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    if restaurant is None:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    food_item = get_food_item(db, item_id)

    if food_item is None:
        raise HTTPException(
            status_code=404,
            detail="Food Item not found",
        )

    if food_item.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
        )

    category = (
        db.query(Category)
        .filter(
            Category.id == category_id,
            Category.restaurant_id == restaurant.id,
        )
        .first()
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    food_item.category_id = category_id
    food_item.name = name
    food_item.description = description
    food_item.price = price
    food_item.available_quantity = available_quantity
    food_item.is_available = is_available

    if image is not None:
        food_item.image = save_image(image)

    food_item = update_food_item(
        db,
        food_item,
    )

    return {
        "id": food_item.id,
        "restaurant_id": food_item.restaurant_id,
        "category_id": food_item.category_id,
        "category": food_item.category.name,
        "name": food_item.name,
        "description": food_item.description,
        "price": food_item.price,
        "image": food_item.image,
        "available_quantity": food_item.available_quantity,
        "is_available": food_item.is_available,
    }


@router.delete("/{item_id}")
def remove_food_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):
    item = get_food_item(db, item_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Food Item not found",
        )

    delete_food_item(db, item)

    return {
        "message": "Food Item deleted"
    }