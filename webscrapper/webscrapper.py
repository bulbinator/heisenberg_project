from bs4 import BeautifulSoup
import requests
import json
import re

# Reading data from JSON to get Element:Number dict
json_file_path = "PeriodicTable.json"

with open(json_file_path, "r", encoding="utf8") as json_file:
    data = json.load(json_file)


element_dict = {}


for element in data["elements"]:
    name = element["name"]
    number = element["number"]
    element_dict[name] = number


for element in element_dict:
    name = element
    number = element_dict[element]
    url = f"https://www.rsc.org/periodic-table/element/{number}/{name}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    content = soup.find("div", class_="acc_blk")
    try:
        content = content.get_text().strip()

        appearance = re.search(r'Appearance((.|\n)+?)Uses', content).group(1)
        uses = re.search(r'Uses((.|\n)+?)Biological role', content).group(1)
        role = re.search(r'Biological role((.|\n)+?)Natural abundance', content).group(1)
        abundance = re.search(r'Natural abundance((.|\n)+$)', content).group(1)

        history = soup.find("div", class_="clear accordian_details") 
        history = history.get_text().strip()
    except:
        break


    element_to_modify = None
    for element in data["elements"]:
        if element["name"] == name:
            element_to_modify = element
            break
    
    
    element_to_modify["appearance"] = appearance
    element_to_modify["uses"] = uses
    element_to_modify["role"] = role
    element_to_modify["abundance"] = abundance
    element_to_modify["history"] = history
    element_to_modify["url"] = url


output_json_file_path = "elements.json"

with open(output_json_file_path, "w") as json_file:
    json.dump(data, json_file, indent=4)

