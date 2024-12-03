from config.config import firestore_db

TABLE_NAME = "users"


def add_user(
    user_id: str,
    height: float,
    weight: float,
    birthday: str,
    gender: str,
    activity_level: str,
    goal: str,
    cal: float,
    protein: float,
    fat: float,
    carb: float
):
    try:
        print(f"Saving to Firestore for user_id: {user_id}")
        doc_ref = firestore_db.collection(TABLE_NAME).document(user_id)
        doc_ref.set({
            "height": height,
            "weight": weight,
            "birthday": birthday,
            "gender": gender,
            "activityLevel": activity_level,
            "goal": goal,
            "cal": cal,
            "protein": protein,
            "fat": fat,
            "carb": carb
        })
        print(f"Successfully saved user {user_id} to Firestore.")
    except Exception as e:
        print(f"Error saving user {user_id} to Firestore: {e}")
        raise Exception(f"Firestore save error: {e}")


def getuser(
    uid: str
):
    try:
        users_doc = firestore_db.collection("users").document(uid).get()
        if users_doc.exists:
            return users_doc.to_dict()  # データを辞書形式で返す
        else:
            print(f"No such document for UID: {uid}")
            return None

    except Exception as e:
        print(f"Error retrieving user info: {e}")
        return None
