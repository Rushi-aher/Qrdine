from pydantic import BaseModel, ConfigDict


class CategoryCreate(BaseModel):
    name: str
    description: str | None = None


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None


class CategoryResponse(BaseModel):
    id: int
    restaurant_id: int
    name: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)

class CategoryUpdate(BaseModel):
    name: str
    description: str | None = None

    class Config:
        from_attributes = True