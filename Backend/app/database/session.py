from sqlalchemy import create_engine

from app.core.config import settings

engine = create_engine(settings.db_url, connect_args={"check_same_thread": False})