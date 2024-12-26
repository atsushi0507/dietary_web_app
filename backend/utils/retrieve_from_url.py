from bs4 import BeautifulSoup
import requests
import unicodedata
import time

def retrieve_material_volume_from_recipe(url):
    max_try = 3
    attempt = 0
    
    while attempt < max_try:
        try:
            response = requests.get(url)
            response.raise_for_status()  # HTTPエラーが発生した場合に例外をスロー
            soup = BeautifulSoup(response.content, "html.parser")

            # タイトル（人数情報）の取得
            person = soup.find("h2", class_="contents_title contents_title_mb")
            if not person or not person.text:
                raise ValueError("Person information not found or empty.")  # 明示的にエラーをスロー

            person = person.text.replace("材料", "").replace("（", "").replace("）", "")

            # 材料と分量の取得
            materials = soup.find_all("span", class_="recipe_material__item_name")
            volumes = soup.find_all("span", class_="recipe_material__item_serving")
            
            res_dict = {}
            for material, volume in zip(materials, volumes):
                material_text = material.get_text(strip=True)
                volume_text = volume.get_text(strip=True)
                if not material_text or not volume_text:
                    continue
                res_dict[material_text] = unicodedata.normalize("NFKC", volume_text).replace("ｇ", "g")

            return res_dict, person

        except Exception as e:
            # エラー発生時に再トライ
            print(f"Attempt {attempt + 1}/{max_try} failed: {e}")
            attempt += 1
            time.sleep(3)

    # 失敗時の処理
    print(f"Failed to retrieve data from {url} after {max_try} attempts.")
    return {}, "0人分"
