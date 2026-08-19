from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required

from app.models.food_item import FoodItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.restaurant import Restaurant
from app.models.table import RestaurantTable

from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate,
    OrderListResponse,
)

from app.services.order_service import (
    get_order,
    get_restaurant_orders,
    update_order,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


# ------------------------
# Customer places an order
# ------------------------
@router.post("", response_model=OrderResponse)
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    table = (
        db.query(RestaurantTable)
        .filter(RestaurantTable.id == order.table_id)
        .first()
    )

    if table is None:
        raise HTTPException(
            status_code=404,
            detail="Table not found",
        )

    new_order = Order(
        restaurant_id=table.restaurant_id,
        table_id=table.id,
        customer_name=order.customer_name,
        status="PENDING",
    )

    db.add(new_order)
    db.flush()

    for item in order.items:
        food = (
            db.query(FoodItem)
            .filter(FoodItem.id == item.food_item_id)
            .first()
        )

        if food is None:
            raise HTTPException(
                status_code=404,
                detail=f"Food Item {item.food_item_id} not found",
            )

        # Check stock availability
        if food.available_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Only {food.available_quantity} items available for {food.name}",
            )

        # Reduce stock
        food.available_quantity -= item.quantity

        # Mark unavailable if stock becomes zero
        if food.available_quantity == 0:
            food.is_available = False

        order_item = OrderItem(
            order_id=new_order.id,
            food_item_id=item.food_item_id,
            quantity=item.quantity,
        )

        db.add(order_item)

    db.commit()
    db.refresh(new_order)

    return new_order

# ------------------------
# Owner sees all orders
# ------------------------
@router.get("", response_model=list[OrderListResponse])
def list_orders(
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

    orders = get_restaurant_orders(
        db,
        restaurant.id,
    )

    result = []

    for order in orders:

        result.append({

            "id": order.id,

            "table_number": order.table.table_number,

            "customer_name": order.customer_name,

            "status": order.status,

            "created_at": order.created_at,

            "items": [

                {

                    "food_item_name": item.food_item.name,

                    "quantity": item.quantity,

                }

                for item in order.order_items

            ],

        })

    return result

# ------------------------
# Owner updates order status
# ------------------------
#========================
# ------------------------
# Customer gets order status
# ------------------------
@router.get("/{order_id}", response_model=OrderResponse)
def get_order_status(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = get_order(
        db,
        order_id,
    )

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return order
#========================


@router.put("/{order_id}", response_model=OrderResponse)
def change_order_status(
    order_id: int,
    status_data: OrderStatusUpdate,
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

    order = get_order(
        db,
        order_id,
    )

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized",
        )

    allowed_status = [
        "PENDING",
        "PREPARING",
        "READY",
        "COMPLETED",
        "CANCELLED",
    ]

    if status_data.status not in allowed_status:
        raise HTTPException(
            status_code=400,
            detail="Invalid status",
        )

    order.status = status_data.status

    return update_order(
        db,
        order,
    )

# ------------------------
# Owner deletes an order
# ------------------------
@router.delete("/{order_id}")
def delete_order(
    order_id: int,
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

    order = get_order(
        db,
        order_id,
    )

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.restaurant_id != restaurant.id:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized",
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }