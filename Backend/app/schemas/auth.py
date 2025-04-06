from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    account: str = Field(..., min_length=4, max_length=50)
    password: str = Field(..., min_length=6, max_length=128)

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    username: str

