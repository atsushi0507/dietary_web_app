from config.config import client, DATASET_NAME, firestore_db
from datetime import date, datetime


TABLE_NAME = "weight_record"

def insert_weight_record(
        user_id: str,
        date: str,
        weight: float
):
    table_id = f"{client.project}.{DATASET_NAME}.{TABLE_NAME}"

    rows_to_insert = [
        {
            "user_id": user_id,
            "date": date,
            "weight": weight
        }
    ]

    errors = client.insert_rows_json(table_id, rows_to_insert)
    if errors:
        raise Exception(f"BigQuery insert errors: {errors}")


def tmp_weight_save_to_firestore(
        user_id,
        timestamp,
        date,
        weight
):
    try:
        doc_ref = firestore_db.collection("weight_records").document(f"{user_id}_{timestamp}")
        doc_ref.set({
            "date": date,
            "weight": weight
        })
    except Exception as e:
        raise Exception(f"Firestore save error: {e}")