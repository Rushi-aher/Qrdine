from pydantic import BaseModel, ConfigDict


class TableCreate(BaseModel):
    table_number: int


class TableResponse(BaseModel):
    id: int
    restaurant_id: int
    table_number: int
    qr_code: str

    model_config = ConfigDict(from_attributes=True)

class TableUpdate(BaseModel):
    table_number: int

    class Config:
        from_attributes = True