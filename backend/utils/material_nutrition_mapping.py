import pandas as pd
from sentence_transformers import SentenceTransformer
import torch
from sentence_transformers.util import cos_sim
import re
from calc_utils import clean_food_name
import MeCab

file_path = "output/nutrition.pkl"
db = pd.read_pickle(file_path)

food_items = db[["食品番号", "食品名"]].copy()
food_items["クリーン食品名"] = food_items["食品名"].apply(clean_food_name)

food_names = food_items["クリーン食品名"].tolist()

# Sentence-BERTのロード
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# 食品名をベクトル化
food_embedding = model.encode(food_names, convert_to_tensor=True)

def find_similar_food(input_food, model, food_names, food_embedding):
    # 入力食品名をベクトル化
    input_embedding = model.encode(input_food, convert_to_tensor=True)

    # コサイン類似度を計算
    similarities = cos_sim(input_embedding, food_embedding)

    # 最も類似しているもののインデックスを取得
    most_similar_idx = torch.argmax(similarities).item()

    # 該当食品の情報を取得
    similar_food = food_items.iloc[most_similar_idx]
    return similar_food

input_food = "バター"
result = find_similar_food(input_food, model, food_names, food_embedding)

print(result)
print(f"{input_food}に最も類似する食材: {result['食品番号']}: {result['食品名']}")

input_food = "ケチャップ"
result = find_similar_food(input_food, model, food_names, food_embedding)

print(result)
print(f"{input_food}に最も類似する食材: {result['食品番号']}: {result['食品名']}")