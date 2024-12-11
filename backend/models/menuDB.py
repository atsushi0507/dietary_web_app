from pydantic import BaseModel, Field


class AddMenuData(BaseModel):
    menu: str
    cal: float = Field(..., gt=0)
    protein: float = Field(..., gt=0)
    fat: float = Field(..., gt=0)
    carb: float = Field(..., gt=0)
    volume: float = Field(..., gt=0)
    createdBy: str
    isVerified: bool
