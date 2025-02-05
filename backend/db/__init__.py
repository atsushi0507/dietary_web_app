from pydantic import BaseModel, Field
from datetime import date, datetime

class MealRecord(BaseModel):
    user_id: str
    meal_type: str
    date: date
    menus: list