from config import client, DATASET_NAME


TABLE_NAME = "your_table_name"

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
