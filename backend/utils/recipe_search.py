import requests
import os
import json
from pprint import pprint

res = requests.get(f"https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId={os.environ['DEV_ID']}")
print(res)
json_data = json.loads(res.text)
pprint(json_data)

os.makedirs("output", exist_ok=True)
with open("output/recipe_id_list.json", "w") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)
