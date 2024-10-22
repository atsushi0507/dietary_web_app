import json
from google.cloud import bigquery
from google.oauth2 import service_account

# サービスアカウントキーのパス (適切なキーを指定)
SERVICE_ACCOUNT_FILE = '/path/to/your/service-account.json'

# BigQuery クライアントの作成
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)
client = bigquery.Client(credentials=credentials, project='your-gcp-project')

# テーブル情報 (適宜変更)
DATASET_NAME = 'your_dataset'
