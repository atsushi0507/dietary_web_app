import json
from config.config import firestore_db


def get_nutrition_data():
    try:
        doc_ref = firestore_db.collection("nutrition_data")
        docs = doc_ref.stream()

        nutrition_data = []
        for doc in docs:
            data = doc.to_dict()  # ドキュメントを辞書形式に変換
            nutrition_data.append(data)
            # menu_name = data.get("menu")  # メニュー名を取得
            # if menu_name:
            #     # 必要なデータを整形
            #     nutrition_data[menu_name] = {
            #         "cal": data.get("cal"),
            #         "protein": data.get("protein"),
            #         "fat": data.get("fat"),
            #         "carb": data.get("carb"),
            #         "volume": data.get("volume")
            #     }

        return nutrition_data
    except Exception as e:
        print(f"Error fetching data: {e}")
        return {}
