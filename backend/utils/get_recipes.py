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

for categoryId in df.categoryId.unique().tolist():
    print(categoryId)