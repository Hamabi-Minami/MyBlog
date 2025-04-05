from pydantic import BaseModel
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(PostCreate):
    id: int
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True