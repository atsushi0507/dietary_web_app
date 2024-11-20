from pathlib import Path
from google.cloud import bigquery
from google.cloud import firestore

client = bigquery.Client(project="dietary-web-app")
firestore_db = firestore.Client(project="dietary-web-app")

# テーブル情報 (適宜変更)
DATASET_NAME = 'app_data'
