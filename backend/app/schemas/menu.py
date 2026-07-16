from pydantic import BaseModel


class MenuFoodItem(BaseModel):
    id: int
    name: str
    description: str | None = None
    price: float
    image: str | None = None
    available_quantity: int
    is_available: bool

    class Config:
        from_attributes = True


class MenuCategory(BaseModel):
    id: int
    name: str
    description: str | None = None
    items: list[MenuFoodItem]


class RestaurantInfo(BaseModel):
    id: int
    name: str
    logo: str | None = None
    banner: str | None = None


class TableInfo(BaseModel):
    id: int
    table_number: int


class MenuResponse(BaseModel):
    restaurant: RestaurantInfo
    table: TableInfo
    categories: list[MenuCategory]