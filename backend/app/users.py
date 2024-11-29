import json
from db.users import add_user
from models.users import AddUser


def add_user_to_fs(request):
    try:
        request_json = request.get_json(silent=True)
        user_data = AddUser(**request_json)

        add_user(
            user_data.user_id,
            user_data.weight,
            user_data.height,
            user_data.birthday,
            user_data.gender,
            user_data.activityLevel,
            user_data.goal,
            user_data.cal,
            user_data.protein,
            user_data.fat,
            user_data.carb
        )

    except Exception as e:
        return json.dump({"error": str(e)}), 500