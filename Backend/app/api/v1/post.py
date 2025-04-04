from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from app.core.dependencies import get_db, get_current_user
from app.models import User
from app.models.article import Article
from app.schemas.post import PostResponse, PostCreate

router = APIRouter()

@router.get("/")
def get_all_posts(db: Session = Depends(get_db), user: User = Depends(get_current_user)):

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            )
    posts = db.query(Article).all()

    response = []
    for post in posts:
        response.append({
            "id": post.id,
            "title": post.title,
            "content": post.content[:120],
            "author": {
                "username": post.author.username if post.author else "Unknown"
            },
            "created_at": post.created_at.strftime("%Y-%m-%d"),
            "likes": post.likes if hasattr(post, "likes") else 0,
            "comments": post.comments if hasattr(post, "comments") else 0,
            "cover_url": post.cover_url if hasattr(post, "cover_url") else "https://via.placeholder.com/150"
        })

    return response


@router.get("/{post_id}")
def get_post_by_id(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Article).filter(Article.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "created_at": post.created_at,
        "author": {
            "id": post.author.id,
            "username": post.author.username,
        } if post.author else None
    }

@router.post("/", response_model=PostResponse, status_code=201)
def publish_post(
    post_data: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_post = Article(
        title=post_data.title,
        content=post_data.content,
        author_id=current_user.id,
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
