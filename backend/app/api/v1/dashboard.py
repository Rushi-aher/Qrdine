from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import owner_required

from app.models.restaurant import Restaurant

from app.schemas.dashboard import DashboardResponse

from app.services.dashboard_service import get_dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("", response_model=DashboardResponse)
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(owner_required),
):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id,
        )
        .first()
    )

    return get_dashboard_stats(
        db,
        restaurant.id,
    )