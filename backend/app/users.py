import json
from db.users import add_user
from models.users import AddUser


def add_user_to_fs(request):
    try:
        request_json = request.get_json(silent=False)
        print(f"Received request JSON: {request_json}")

        user_data = AddUser(**request_json)
        print(f"Validated user data: {user_data}")

        add_user(
            user_id=user_data.user_id,
            weight=user_data.weight,
            height=user_data.height,
            birthday=user_data.birthday,
            gender=user_data.gender,
            activity_level=user_data.activityLevel,
            goal=user_data.goal,
            cal=user_data.cal,
            protein=user_data.protein,
            fat=user_data.fat,
            carb=user_data.carb
        )

    except Exception as e:
        return json.dump({"error": str(e)}), 500