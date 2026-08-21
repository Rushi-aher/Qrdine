from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required

from app.models.restaurant import Restaurant
from app.models.category import Category

from app.schemas.restaurant import (
    RestaurantCreate,
    RestaurantResponse,
)

from app.services.restaurant_service import (
    create_restaurant,
    update_restaurant,
)

from app.utils.file_upload import save_image


router = APIRouter(
    prefix="/restaurants",
    tags=["Restaurants"],
)


# -----------------------------
# Create Restaurant
# -----------------------------
@router.post(
    "",
    response_model=RestaurantResponse,
)
def add_restaurant(
    restaurant: RestaurantCreate,
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):

    existing = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Restaurant already exists",
        )

    new_restaurant = Restaurant(

        owner_id=current_user.id,

        name=restaurant.name,

        description=restaurant.description,

        address=restaurant.address,

        phone=restaurant.phone,

        logo=restaurant.logo,

        banner=restaurant.banner,

        opening_time=restaurant.opening_time,

        closing_time=restaurant.closing_time,

    )

    # Create restaurant
    new_restaurant = create_restaurant(
        db,
        new_restaurant,
    )

    # Create default category
    default_category = Category(

        restaurant_id=new_restaurant.id,

        name="Fast Food",

        description="Default food category",

    )

    db.add(default_category)

    db.commit()

    return new_restaurant


# -----------------------------
# Public Restaurant List
# -----------------------------
@router.get(
    "/public",
)
def get_public_restaurants(
    db: Session = Depends(get_db),
):

    restaurants = (
        db.query(Restaurant)
        .all()
    )

    return [

        {
            "id": restaurant.id,

            "name": restaurant.name,

            "description": restaurant.description,

            "address": restaurant.address,

            "logo": restaurant.logo,

            "banner": restaurant.banner,

        }

        for restaurant in restaurants

    ]


# -----------------------------
# Get My Restaurant
# -----------------------------
@router.get(
    "/me",
    response_model=RestaurantResponse,
)
def get_my_restaurant(
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )

    if restaurant is None:

        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    return restaurant


# -----------------------------
# Update My Restaurant
# -----------------------------
@router.put(
    "/me",
    response_model=RestaurantResponse,
)
def edit_restaurant(

    name: str = Form(...),

    description: str = Form(""),

    address: str = Form(...),

    phone: str = Form(...),

    opening_time: str = Form(...),

    closing_time: str = Form(...),

    logo: UploadFile | None = File(None),

    banner: UploadFile | None = File(None),

    db: Session = Depends(get_db),

    current_user=Depends(owner_required),

):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )

    if restaurant is None:

        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    restaurant.name = name

    restaurant.description = description

    restaurant.address = address

    restaurant.phone = phone

    restaurant.opening_time = opening_time

    restaurant.closing_time = closing_time

    if logo is not None:

        restaurant.logo = save_image(logo)

    if banner is not None:

        restaurant.banner = save_image(banner)

    return update_restaurant(
        db,
        restaurant,
    )