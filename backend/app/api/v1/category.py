from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required
from app.models.restaurant import Restaurant
from app.models.category import Category
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.services.category_service import (
    create_category,
    get_categories,
    get_category,
    update_category,
    delete_category,
)
router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post("", response_model=CategoryResponse)
def add_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    return create_category(
        db=db,
        restaurant=restaurant,
        name=category.name,
        description=category.description,
    )


@router.get("", response_model=list[CategoryResponse])
def list_categories(
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    return get_categories(
        db,
        restaurant.id,
    )

@router.put("/{category_id}", response_model=CategoryResponse)
def edit_category(
    category_id: int,
    data: CategoryUpdate,
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

    category = get_category(
        db,
        category_id,
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    if category.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
        )

    category.name = data.name
    category.description = data.description

    return update_category(
        db,
        category,
    )


@router.delete("/{category_id}")
def remove_category(
    category_id: int,
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

    category = get_category(
        db,
        category_id,
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    if category.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
        )
    if category.name == "Fast Food":
        raise HTTPException(
            status_code=400,
            detail="The default Fast Food category cannot be deleted",
        )
    delete_category(
        db,
        category,
    )

    return {
        "message": "Category deleted successfully"
    }