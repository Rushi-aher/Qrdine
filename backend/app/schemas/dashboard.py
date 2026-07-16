from pydantic import BaseModel


class DashboardResponse(BaseModel):
    today_orders: int
    pending_orders: int
    preparing_orders: int
    ready_orders: int
    completed_orders: int

    total_food_items: int
    total_categories: int
    total_tables: int