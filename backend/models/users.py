from pydantic import BaseModel, Field


class AddUser(BaseModel):
    user_id: str
    height: float = Field(..., gt=0, description="Height in centimeters")
    weight: float = Field(..., gt=0, description="Weight in kilograms")
    birthday: str  # Format: YYYY-MM-DD
    gender: str
    activityLevel: str
    goal: str
    cal: float
    protein: float
    fat: float
    carb: float
