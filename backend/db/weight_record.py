from config.config import client, DATASET_NAME, firestore_db
from datetime import date, datetime

TABLE_NAME = "weight_record"


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