from pydantic import BaseModel
from datetime import datetime


class OrderItemCreate(BaseModel):
    food_item_id: int
    quantity: int


class OrderCreate(BaseModel):
    table_id: int
    customer_name: str
    items: list[OrderItemCreate]


class OrderItemResponse(BaseModel):
    id: int
    food_item_id: int
    quantity: int

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    restaurant_id: int
    table_id: int
    customer_name: str
    status: str
    order_items: list[OrderItemResponse]

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str


    

class OrderItemListResponse(BaseModel):
    food_item_name: str
    quantity: int

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    id: int
    table_number: int
    customer_name: str
    status: str
    created_at: datetime
    items: list[OrderItemListResponse]

    class Config:
        from_attributes = True