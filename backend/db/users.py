from config.config import firestore_db

TABLE_NAME = "users"


def add_user(
    user_id,
    height,
    weight,
    birthday,
    gender,
    activityLevel,
    goal,
    cal,
    protein,
    fat,
    carb
):
    try:
        doc_ref = firestore_db.collection(TABLE_NAME).document(user_id)
        doc_ref.set({
            "height": height,
            "weight": weight,
            "birthday": birthday,
            "gender": gender,
            "activityLevel": activityLevel,
            "goal": goal,
            "calories": cal,
            "protein": protein,
            "fat": fat,
            "carb": carb
        })
    except Exception as e:
        raise Exception(f"Firestore save error: {e}")
