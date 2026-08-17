from pydantic import BaseModel


class ProductBase(BaseModel):

    name: str

    description: str | None = None

    category: str

    image: str | None = None

    price: float

    stock: int


class ProductCreate(ProductBase):

    pass


class ProductUpdate(ProductBase):

    pass


class ProductResponse(ProductBase):

    id: int

    available: bool

    class Config:

        from_attributes = True