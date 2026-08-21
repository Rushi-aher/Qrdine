from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Date

from app.database.session import get_db
from app.dependencies.auth import owner_required

from app.models.restaurant import Restaurant
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.food_item import FoodItem


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("")
def get_analytics(
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

    orders = (
        db.query(Order)
        .filter(Order.restaurant_id == restaurant.id)
        .all()
    )

    total_orders = len(orders)

    pending_orders = sum(
        1 for order in orders
        if order.status == "PENDING"
    )

    preparing_orders = sum(
        1 for order in orders
        if order.status == "PREPARING"
    )

    ready_orders = sum(
        1 for order in orders
        if order.status == "READY"
    )

    completed_orders = sum(
        1 for order in orders
        if order.status == "COMPLETED"
    )

    cancelled_orders = sum(
        1 for order in orders
        if order.status == "CANCELLED"
    )

    revenue = (
        db.query(
            func.sum(
                OrderItem.quantity * FoodItem.price
            )
        )
        .join(
            FoodItem,
            FoodItem.id == OrderItem.food_item_id
        )
        .join(
            Order,
            Order.id == OrderItem.order_id
        )
        .filter(
            Order.restaurant_id == restaurant.id,
            Order.status != "CANCELLED",
        )
        .scalar()
    )

    top_products = (
        db.query(
            FoodItem.name,
            func.sum(
                OrderItem.quantity
            ).label("quantity")
        )
        .join(
            OrderItem,
            OrderItem.food_item_id == FoodItem.id
        )
        .join(
            Order,
            Order.id == OrderItem.order_id
        )
        .filter(
            Order.restaurant_id == restaurant.id,
            Order.status != "CANCELLED",
        )
        .group_by(
            FoodItem.id,
            FoodItem.name
        )
        .order_by(
            func.sum(
                OrderItem.quantity
            ).desc()
        )
        .limit(5)
        .all()
    )

    # -----------------------------
    # Daily Orders
    # -----------------------------

    daily_orders = (
        db.query(
            cast(Order.created_at, Date).label("date"),
            func.count(Order.id).label("orders")
        )
        .filter(
            Order.restaurant_id == restaurant.id,
            Order.status != "CANCELLED",
        )
        .group_by(
            cast(Order.created_at, Date)
        )
        .order_by(
            cast(Order.created_at, Date)
        )
        .all()
    )

    return {

        "total_orders": total_orders,

        "total_revenue": round(
            revenue or 0,
            2
        ),

        "pending_orders": pending_orders,

        "preparing_orders": preparing_orders,

        "ready_orders": ready_orders,

        "completed_orders": completed_orders,

        "cancelled_orders": cancelled_orders,

        "status_data": [
            {
                "name": "Pending",
                "value": pending_orders,
            },
            {
                "name": "Preparing",
                "value": preparing_orders,
            },
            {
                "name": "Ready",
                "value": ready_orders,
            },
            {
                "name": "Completed",
                "value": completed_orders,
            },
            {
                "name": "Cancelled",
                "value": cancelled_orders,
            },
        ],

        "top_products": [
            {
                "name": product.name,
                "quantity": product.quantity,
            }
            for product in top_products
        ],

        "daily_orders": [
            {
                "date": str(order.date),
                "orders": order.orders,
            }
            for order in daily_orders
        ],
    }