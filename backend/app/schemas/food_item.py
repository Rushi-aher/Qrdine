from pydantic import BaseModel


class FoodItemCreate(BaseModel):

    category_id: int
    name: str
    description: str
    price: float
    image: str = ""
    available_quantity: int
    is_available: bool = True


class FoodItemResponse(BaseModel):

    id: int
    restaurant_id: int

    category_id: int
    category: str

    name: str
    description: str

    price: float

    image: str

    available_quantity: int

    is_available: bool

    class Config:

        from_attributes = True


class FoodItemUpdate(BaseModel):

    category_id: int
    name: str
    description: str | None = None
    price: float
    available_quantity: int
    is_available: bool

    class Config:

        from_attributes = True