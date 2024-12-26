import pandas as pd
import os

excel_file = "data/20230428-mxt_kagsei-mext_00001_012.xlsx"

df = pd.read_excel(
    excel_file,
    sheet_name=0,
    header=11,
    usecols="B, D, G, J, M, U",
    names=["食品番号", "食品名", "エネルギー(kcal)", "たんぱく質", "脂質", "炭水化物"]
)

os.makedirs("output", exist_ok=True)
df.to_pickle("output/nutrition.pkl")
