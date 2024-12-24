import requests
import os
import json
from pprint import pprint
import pandas as pd
import time

with open("output/recipe_id_list.json", "r") as f:
    json_data = json.load(f)
# mediumカテゴリの親カテゴリの辞書
parent_dict = {}

df = pd.DataFrame(columns=['category1','category2','category3','categoryId','categoryName'])

# 大カテゴリ
for category in json_data['result']['large']:
    tmp_dict = {
        "category1": category["categoryId"],
        "category2": "",
        "category3": "",
        "categoryId": category["categoryId"],
        "categoryName": category["categoryName"]
    }
    df = pd.concat([df, pd.DataFrame([tmp_dict])])

for category in json_data["result"]["medium"]:
    tmp_dict = {
        "category1": category["parentCategoryId"],
        "category2": category["categoryId"],
        "category3": "",
        "categoryId": f"{category['parentCategoryId']}-{category['categoryId']}",
        "categoryName": category["categoryName"]
    }
    df = pd.concat([df, pd.DataFrame([tmp_dict])])
    parent_dict[str(category["categoryId"])] = category["parentCategoryId"]

for category in json_data["result"]["small"]:
    tmp_dict = {
        "category1": parent_dict[category["parentCategoryId"]],
        "category2": category["parentCategoryId"],
        "category3": category["categoryId"],
        "categoryId": f"{parent_dict[category['parentCategoryId']]}-{category['parentCategoryId']}-{category['categoryId']}",
        "categoryName": category["categoryName"]
    }
    df = pd.concat([df, pd.DataFrame([tmp_dict])])

df = df.reset_index(drop=True)

result_df = pd.DataFrame()
for index, row in df.iterrows():
    print(f"{index}| {row['categoryName']}: {row['categoryId']}")
    url = f"https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId={row['categoryId']}&applicationId={os.environ['DEV_ID']}"
    res = requests.get(url)

    json_data = json.loads(res.text)

    if not json_data["result"]:
        continue
    recipes = json_data["result"]

    for recipe in recipes:
        tmp_dict = {
            "categoryName": row["categoryName"],
            "categoryId": row["categoryId"],
            "recipeTitle": recipe["recipeTitle"],
            "recipeMaterial": recipe["recipeMaterial"]
        }
        result_df = pd.concat([result_df, pd.DataFrame([tmp_dict])])
    time.sleep(3)

os.makedirs("output", exist_ok=True)
result_df.to_csv("output/recipe_list.csv", index=False)
