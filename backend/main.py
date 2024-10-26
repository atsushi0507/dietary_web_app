from app.weight_record import tmp_weight_save_to_firestore


def record_weight_to_fs(request):
    # 体重記録用の関数を呼び出す
    return tmp_weight_save_to_firestore(
            request.user_id,
            request.timestamp,
            request.date,
            request.weight
        )

# def record_weight_to_fs(request):
#     try:
#         request_json = request.get_json(silent=True)
#         weight_record = WeightRecord(**request_json)

#         tmp_weight_save_to_firestore(
#             weight_record.user_id,
#             weight_record.timestamp,
#             weight_record.date,
#             weight_record.weight
#         )

#         return json.dump({"message": "Weight recorded to the firestore successfully"}), 200
#     except Exception as e:
#         return json.dump({"error": str(e)}), 500
