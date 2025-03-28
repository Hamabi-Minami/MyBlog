from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db

router = APIRouter()

@router.get("/me")
def get_current_user(name: str, password: str):
    # get current user

    return {'name': name, 'password': password}

@router.get("/")
def get_users(db: Session=Depends(get_db)):
    #  get all users
    return {'': ''}