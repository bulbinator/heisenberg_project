from bs4 import BeautifulSoup
import requests
import json

# Reading data from JSON to get Element:Number dict
json_file_path = "PeriodicTableJSON.json"

with open(json_file_path, "r") as json_file:
    data = json.load(json_file)


element_dict = {}


for element in data["elements"]:
    name = element["name"]
    number = element["number"]
    element_dict[name] = number

# Print the resulting dictionary
print(element_dict)





response = requests.get("https://www.rsc.org/periodic-table/element/6/carbon")

soup = BeautifulSoup(response.content, 'html.parser')


content = soup.find("div", class_="acc_blk")
content = content.get_text()