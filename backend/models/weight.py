from pydantic import BaseModel, Field
from datetime import date


class WeightRecord(BaseModel):
    user_id: str
    date: date
    weight: float = Field(gt=0, description="体重は0より大きい値を設定")
