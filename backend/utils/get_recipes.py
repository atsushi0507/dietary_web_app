import requests
import os
import json
import pandas as pd
import time
from retrieve_from_url import retrieve_material_volume_from_recipe

# レシピ ID リストの読み込み
with open("output/recipe_id_list.json", "r") as f:
    json_data = json.load(f)

# mediumカテゴリの親カテゴリの辞書
parent_dict = {}

df = pd.DataFrame(columns=['category1', 'category2', 'category3', 'categoryId', 'categoryName'])

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

# 中カテゴリ
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

# 小カテゴリ
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

# 出力先ディレクトリの作成とCSVの初期化
os.makedirs("output", exist_ok=True)
output_csv_path = "output/recipe_list.csv"

# ヘッダー付きの空のCSVファイルを作成
result_df = pd.DataFrame(columns=[
    "categoryName", "categoryId", "recipeTitle", 
    "recipeMaterial", "recipeUrl", "materialVolume"
])
result_df.to_csv(output_csv_path, index=False)

# レシピの取得とCSVへの追記処理
for index, row in df.iterrows():
    print(f"{index}| {row['categoryName']}: {row['categoryId']}")
    url = f"https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId={row['categoryId']}&applicationId={os.environ['DEV_ID']}"
    res = requests.get(url)

    json_data = json.loads(res.text)

    if not json_data["result"]:
        print("Recipe retrieval failed")
        continue
    recipes = json_data["result"]

    for recipe in recipes:
        print(recipe["recipeTitle"])
        recipeDetail, volume = retrieve_material_volume_from_recipe(recipe["recipeUrl"])
        
        if recipeDetail == {} and volume == "0人分":
            continue

        tmp_dict = {
            "categoryName": row["categoryName"],
            "categoryId": row["categoryId"],
            "recipeTitle": recipe["recipeTitle"],
            "volume": volume,
            "recipeUrl": recipe["recipeUrl"],
            "materialVolume": recipeDetail
        }
        
        # データフレームに変換してCSVに追記
        pd.DataFrame([tmp_dict]).to_csv(output_csv_path, mode="a", header=False, index=False)
        time.sleep(3)
    time.sleep(3)
