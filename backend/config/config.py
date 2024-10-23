import json
from pathlib import Path
from google.cloud import bigquery
from google.oauth2 import service_account

BASE_DIR = Path(__file__).resolve().parent.parent
# サービスアカウントキーのパス (適切なキーを指定)
SERVICE_ACCOUNT_FILE = BASE_DIR / 'config/dietary-web-app-5e82d25a492c.json'

# BigQuery クライアントの作成
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)
client = bigquery.Client(credentials=credentials, project='dietary-web-app')

# テーブル情報 (適宜変更)
DATASET_NAME = 'app_data'
