import json
from models.menuDB import AddMenuData
from config.config import firestore_db


def add_menu_data(request):
    try:
        request_json = request.get_json(silent=False)
        menuData = AddMenuData(**request_json)

        doc_ref = firestore_db.collection("nutrition_data").document()
        doc_ref.set({
            "menu": menuData.menu,
            "cal": menuData.cal,
            "protein": menuData.protein,
            "fat": menuData.fat,
            "carb": menuData.carb,
            "volume": menuData.volume,
            "createdBy": menuData.createdBy,
            "isVerified": menuData.isVerified
        })
        print("Successfully saved")
    except Exception as e:
        print(f"Error at saving nutrition data to Firestore: {e}")
        print(f"menuData: {menuData}")
        raise Exception(f"Firestore save error: {e}")
