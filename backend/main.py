from app.weight_record import tmp_weight_save_to_firestore
from app.users import add_user_to_fs
from models.users import AddUser
import json

def record_weight_to_fs(request):
    # Preflight リクエスト (CORS用のOPTIONSメソッド) への対応
    if request.method == 'OPTIONS':
        # Preflightリクエストに対応するためにヘッダーを設定
        headers = {
            'Access-Control-Allow-Origin': '*',  # 必要に応じて特定のオリジンに変更
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # POSTリクエストへの処理
    if request.method == 'POST':
        try:
            # JSONリクエストからデータを取得
            data = request.get_json()

            # 体重記録用の関数を呼び出す
            tmp_weight_save_to_firestore(
                data['user_id'],
                data['timestamp'],
                data['date'],
                data['weight']
            )

            # CORSヘッダーを含めたレスポンスを返す
            headers = {
                'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
            }
            return (json.dumps({'message': 'Weight recorded successfully!'}), 200, headers)

        except Exception as e:
            headers = {
                'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
            }
            return (json.dumps({'error': f'Failed to record weight: {str(e)}'}), 500, headers)

    # その他のHTTPメソッドには対応しない
    headers = {
        'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
    }
    return (json.dumps({'error': 'Invalid request method'}), 405, headers)


def add_user(request):
    if request.method == 'OPTIONS':
        # Preflightリクエストに対応するためにヘッダーを設定
        headers = {
            'Access-Control-Allow-Origin': '*',  # 必要に応じて特定のオリジンに変更
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # POSTリクエストへの処理
    if request.method == 'POST':
        try:
            add_user_to_fs(
                request
            )

            # CORSヘッダーを含めたレスポンスを返す
            headers = {
                'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
            }
            return (json.dumps({'message': 'Add user successfully!'}), 200, headers)

        except Exception as e:
            headers = {
                'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
            }
            return (json.dumps({'error': f'Failed to add user: {str(e)}'}), 500, headers)

    # その他のHTTPメソッドには対応しない
    headers = {
        'Access-Control-Allow-Origin': '*'  # 必要に応じて特定のオリジンに変更
    }
    return (json.dumps({'error': 'Invalid request method'}), 405, headers)
