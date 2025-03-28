from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Boolean

from app.database.base import Base


class BaseModel(Base):
    __abstract__ = True
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
    is_deleted = Column(Boolean, default=False)