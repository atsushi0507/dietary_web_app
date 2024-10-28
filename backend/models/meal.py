from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Dict, Literal

class MealRecord(BaseModel):
    user_id: str
    meal_type: Literal["朝食", "昼食", "夕食", "間食"]
    date: date
    menus: Dict[str, float]
