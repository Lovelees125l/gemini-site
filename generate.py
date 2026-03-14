import google.generativeai as genai
import os

api_key = os.getenv("GEMINI_TOKEN")

genai.configure(api_key=api_key, transport='rest')
from google.generativeai import client
client._default_client_options = {'api_version': 'v1'}

model = genai.GenerativeModel('gemini-1.5-flash')

prompt = "Create a professional personal portfolio HTML with Tailwind CSS. Hero: AI & Docker Expert. Sections: About, Skills, Projects. Dark theme. Return ONLY raw HTML code."

try:
    response = model.generate_content(prompt)
    text = response.text
    
    if "```html" in text:
        text = text.split("```html")[1].split("```")[0]
    elif "```" in text:
        text = text.split("```")[1].split("```")[0]
    
    with open("index.html", "w") as f:
        f.write(text.strip())
    print("SUCCESS: index.html generated via API v1!")
except Exception as e:
    print(f"ERROR: {e}")
