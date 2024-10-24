from pydantic import BaseModel, Field
from datetime import date, datetime


class WeightRecord(BaseModel):
    user_id: str
    timestamp: datetime
    date: date
    weight: float = Field(gt=0, description="体重は0より大きい値を設定")
