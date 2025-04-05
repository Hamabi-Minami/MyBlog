from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models import User
from app.models.article import Article

router = APIRouter()

@router.get('/post')
def get_all_posts(db: Session = Depends(get_db), user: User = Depends(get_current_user)):

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    posts = db.query(Article).all()

    return {'posts': posts}

@router.post('/post')
def publish_post():
    ...

