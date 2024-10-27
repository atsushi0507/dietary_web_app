from pathlib import Path
from google.cloud import bigquery
from google.cloud import firestore
import os

# credentials_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path

client = bigquery.Client(project="dietary-web-app")
firestore_db = firestore.Client(project="dietary-web-app")

# テーブル情報 (適宜変更)
DATASET_NAME = 'app_data'
