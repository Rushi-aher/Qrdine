from datetime import time
from pydantic import BaseModel, ConfigDict


class RestaurantCreate(BaseModel):
    name: str
    description: str | None = None
    address: str
    phone: str
    logo: str | None = None
    banner: str | None = None
    opening_time: time
    closing_time: time


class RestaurantUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    address: str | None = None
    phone: str | None = None
    logo: str | None = None
    banner: str | None = None
    opening_time: time | None = None
    closing_time: time | None = None


class RestaurantResponse(BaseModel):
    id: int
    owner_id: int
    name: str
    description: str | None
    address: str
    phone: str
    logo: str | None
    banner: str | None
    opening_time: time | None
    closing_time: time | None

    model_config = ConfigDict(from_attributes=True)

class RestaurantUpdate(BaseModel):
    name: str
    description: str | None = None
    address: str
    phone: str
    opening_time: time
    closing_time: time