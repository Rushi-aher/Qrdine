from fastapi import Depends, FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.staticfiles import StaticFiles

from app.dependencies.auth import get_current_user

from app.api.v1 import (
    auth_router,
    restaurant_router,
    table_router,
    category_router,
    food_item_router,
    menu_router,
    order_router,
    dashboard_router,
    menu_router,
)

app = FastAPI(
    title="QRdine API",
    version="1.0.0",
)

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

app.include_router(auth_router)
app.include_router(restaurant_router)
app.include_router(table_router)
app.include_router(category_router)
app.include_router(food_item_router)
app.include_router(menu_router)
app.include_router(order_router)
app.include_router(dashboard_router)
app.include_router(menu_router)

@app.get("/")
def root():
    return {
        "message": "QRdine Backend Running 🚀"
    }


@app.get("/protected")
def protected(
    current_user=Depends(get_current_user),
):
    return {
        "message": f"Welcome {current_user.full_name}",
        "role": current_user.role,
    }