from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/me")
def get_current_user(user: User = Depends(get_current_user)):
    # get current user

    return {user}

@router.get("/")
def get_users(db: Session=Depends(get_db)):
    #  get all users
    return {'': ''}