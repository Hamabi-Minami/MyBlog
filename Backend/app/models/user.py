
from sqlalchemy import Column, Integer, String

from app.models import BaseModel


class User(BaseModel):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    account = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)