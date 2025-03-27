from fastapi import APIRouter


router = APIRouter()

@router.get("/user")
def get_user(name: str, password: str):

    return {'name': name, 'password': password}
