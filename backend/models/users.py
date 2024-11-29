from pydantic import BaseModel, Field
from datetime import date


class AddUser(BaseModel):
    user_id: str
    height: float
    weight: float
    birthday: date
    gender: str
    activityLevel: str
    goal: str
    cal: float
    protein: float
    fat: float
    carb: float
