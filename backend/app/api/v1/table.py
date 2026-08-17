from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required
from app.models.user import User
from app.schemas.table import (
    TableCreate,
    TableResponse,
    TableUpdate,
)
from app.services.restaurant_service import (
    get_restaurant_by_owner,
)
from app.models.restaurant import Restaurant
from app.services.table_service import (
    create_table,
    get_tables,
    get_table,
    update_table,
    delete_table,
)


router = APIRouter(
    prefix="/tables",
    tags=["Tables"],
)


@router.post(
    "",
    response_model=TableResponse,
)
def add_table(
    table: TableCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(owner_required),
):
    restaurant = get_restaurant_by_owner(
        db,
        current_user.id,
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    new_table = create_table(
        db,
        restaurant,
        table.table_number,
    )

    if not new_table:
        raise HTTPException(
            status_code=400,
            detail="Table already exists",
        )

    return new_table


@router.get(
    "",
    response_model=list[TableResponse],
)
def list_tables(
    db: Session = Depends(get_db),
    current_user: User = Depends(owner_required),
):
    restaurant = get_restaurant_by_owner(
        db,
        current_user.id,
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    return get_tables(
        db,
        restaurant.id,
    )


@router.put("/{table_id}", response_model=TableResponse)
def edit_table(
    table_id: int,
    data: TableUpdate,
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

    table = get_table(
        db,
        table_id,
    )

    if table is None:
        raise HTTPException(
            status_code=404,
            detail="Table not found",
        )

    if table.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
        )

    table.table_number = data.table_number

    return update_table(
        db,
        table,
    )


@router.delete("/{table_id}")
def remove_table(
    table_id: int,
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

    table = get_table(
        db,
        table_id,
    )

    if table is None:
        raise HTTPException(
            status_code=404,
            detail="Table not found",
        )

    if table.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
        )

    delete_table(
        db,
        table,
    )

    return {
        "message": "Table deleted successfully"
    }

@router.get(
    "/public/{restaurant_id}",
    response_model=list[TableResponse],
)
def list_public_tables(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.id == restaurant_id)
        .first()
    )

    if restaurant is None:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    return get_tables(
        db,
        restaurant.id,
    )
