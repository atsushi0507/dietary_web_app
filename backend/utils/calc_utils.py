from difflib import SequenceMatcher
import re

unit_to_gram = {
    "kg": 1000,
    "g": 1,
    "mg": 1000,
    "ml": 1,
    "大さじ": 15,
    "大": 15,
    "小さじ": 5,
    "小": 5,
    "カップ": 200,
    "cc": 1
}

def clean_food_name(food_name):
    """食品名から分類ラベルなどを除去"""
    # 括弧や角括弧で囲まれた文字列を削除
    cleaned_name = re.sub(r"[（）\(\)＜＞\<\>].*?[）＞\)＞\>]", "", food_name)
    # 余分な空白を削除
    return cleaned_name.strip()

def calculate_similarity(a, b):
    """文字列aとbの類似度を計算"""
    return SequenceMatcher(None, a, b).ratio()

def clean_nutrition_value(value):
    """
    栄養素の値からカッコ書きや非数値を除去し、数値に変換する。
    """
    # カッコ書きを削除
    cleaned_value = re.sub(r"\(.*?\)", "", str(value))
    try:
        # 数値に変換
        return float(cleaned_value)
    except ValueError:
        # 非数値の場合は None を返す
        return None

def find_material_match(material, db, threshold=0.5):
    db["クリーン食品名"] = db["食品名"].apply(clean_food_name)
    clean_material = clean_food_name(material)
    """文字列の類似度を利用して最も近い食品を検索"""
    similarities = db["クリーン食品名"].apply(lambda x: calculate_similarity(clean_material, x))
    db["類似度"] = similarities  # 類似度をデータフレームに追加
    for col in ["エネルギー(kcal)", "たんぱく質", "脂質", "炭水化物"]:
        db[col] = db[col].apply(clean_nutrition_value)
    # print(db.sort_values(by="類似度"))

    # 閾値以上の候補を絞り込み
    matched = db[db["類似度"] >= threshold]
    # matched = db[db["類似度"]]
    
    if not matched.empty:
        # 類似度が最大の行を取得
        best_match = matched.sort_values(by="類似度", ascending=False).iloc[0]
        return best_match
    else:
        # 閾値を超える候補がなければNoneを返す
        return None

def convert_to_grams(volume):
    if "g" in volume:
        return float(volume.replace("g", ""))
    elif ("大さじ" or "大") in volume:
        return float(volume.replace("大さじ", "")) * 15  # 仮: 大さじ1 = 15g
    elif ("小さじ" or "小") in volume:
        return float(volume.replace("小さじ", "")) * 5  # 仮: 小さじ1 = 5g
    elif "少々" in volume or "適量" in volume:
        return 0  # 無視
    else:
        return 0  # 不明な単位は無視
