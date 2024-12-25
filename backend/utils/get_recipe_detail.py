import requests
import os
import pandas as pd
import time
from bs4 import BeautifulSoup
from retrieve_from_url import retrieve_material_volume_from_recipe

url = "https://recipe.rakuten.co.jp/recipe/1570003792/?rafcid=wsc_r_cr_1082554231850881125#google_vignette"
retrieve_material_volume_from_recipe(url)
