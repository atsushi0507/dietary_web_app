from bs4 import BeautifulSoup
import requests
import unicodedata

def retrieve_material_volume_from_recipe(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    person = soup.find("h2", class_="contents_title contents_title_mb")
    materials = soup.find_all("span", class_="recipe_material__item_name")
    volumes = soup.find_all("span", class_="recipe_material__item_serving")

    if not person.text:
        return {}, "0人分"
    person = person.text.replace("材料", "").replace("（", "").replace("）", "")

    res_dict = {}
    for material, volume in zip(materials, volumes):
        material_text = material.get_text(strip=True)
        volume_text = volume.get_text(strip=True)
        if not material_text or not volume_text:
            continue
        res_dict[material_text] = unicodedata.normalize("NFKC", volume_text).replace("ｇ", "g")
    return res_dict, person
