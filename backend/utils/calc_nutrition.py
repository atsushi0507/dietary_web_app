import pandas as pd
import numpy as np
import ast
from calc_utils import convert_to_grams, find_material_match

recipe_df = pd.read_csv("output/recipe_list.csv")
nutrition_df = pd.read_pickle("output/nutrition.pkl")
nutrition_df.replace("Tr", 0.01, inplace=True)

for index, recipe in recipe_df.iterrows():
    dict_obj = ast.literal_eval(recipe.materialVolume)
    total_cal = 0
    total_p = 0
    total_f = 0
    total_c = 0
    total_weight = 0
    for material, volume in dict_obj.items():
        print(material, volume)
        # match = nutrition_df[nutrition_df["食品名"].str.contains(material, na=False)]
        match = find_material_match(material, nutrition_df)
        if match is not None:
            print(match)
            weight = convert_to_grams(volume)  # 分量をグラムに変換

            energy = (float(match["エネルギー(kcal)"]) if not np.isnan(match["エネルギー(kcal)"]) else 0) * weight / 100
            protein = (float(match["たんぱく質"]) if not np.isnan(match["たんぱく質"]) else 0) * weight / 100
            fat = (float(match["脂質"]) if not np.isnan(match["脂質"]) else 0) * weight / 100
            carb = (float(match["炭水化物"]) if not np.isnan(match["炭水化物"]) else 0) * weight / 100

            # 合計値に加算
            total_cal += energy
            total_p += protein
            total_f += fat
            total_c += carb
            total_weight += weight

            print(total_cal, total_p, total_f, total_c)
    print(f"Recipe: {recipe['recipeTitle']}")
    print(f"Total Calories: {total_cal:.2f} kcal")
    print(f"Total Protein: {total_p:.2f} g")
    print(f"Total Fat: {total_f:.2f} g")
    print(f"Total Carbs: {total_c:.2f} g")
    print(f"Total Weight: {total_weight:.2f} g")
    print("-" * 50)
    break