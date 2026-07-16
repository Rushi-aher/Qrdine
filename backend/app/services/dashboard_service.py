from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.category import Category
from app.models.food_item import FoodItem
from app.models.order import Order
from app.models.table import RestaurantTable


def get_dashboard_stats(db: Session, restaurant_id: int):

    today = date.today()

    today_orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id,
            func.date(Order.created_at) == today,
        )
        .count()
    )

    pending_orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id,
            Order.status == "PENDING",
        )
        .count()
    )

    preparing_orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id,
            Order.status == "PREPARING",
        )
        .count()
    )

    ready_orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id,
            Order.status == "READY",
        )
        .count()
    )

    completed_orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id,
            Order.status == "COMPLETED",
        )
        .count()
    )

    total_food_items = (
        db.query(FoodItem)
        .filter(
            FoodItem.restaurant_id == restaurant_id,
        )
        .count()
    )

    total_categories = (
        db.query(Category)
        .filter(
            Category.restaurant_id == restaurant_id,
        )
        .count()
    )

    total_tables = (
        db.query(RestaurantTable)
        .filter(
            RestaurantTable.restaurant_id == restaurant_id,
        )
        .count()
    )

    return {
        "today_orders": today_orders,
        "pending_orders": pending_orders,
        "preparing_orders": preparing_orders,
        "ready_orders": ready_orders,
        "completed_orders": completed_orders,
        "total_food_items": total_food_items,
        "total_categories": total_categories,
        "total_tables": total_tables,
    }