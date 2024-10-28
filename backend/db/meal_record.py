from config.config import DATASET_NAME, firestore_db
from datetime import date

TABLE_NAME = "meal_record"


def tmp_meal_save_to_firestore(
        user_id,
        date,
        meal_type,
        menus
):
    try:
        doc_ref = firestore_db.collection(TABLE_NAME).document(f"{user_id}_{date}_{meal_type}")
        doc_ref.set({
            menus
        })
    except Exception as e:
        raise Exception(f"Firestore save error at meal record: {e}")
