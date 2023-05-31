from fastapi import FastAPI, Response, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os
import requests
from os import getenv
from input_form import InputText


server_url = getenv('MODEL_SERVICE_URL', "http://0.0.0.0:8000")

app = FastAPI(swagger_ui_oauth2_redirect_url=None)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/submit')
async def predict(request: Request, data: str = Form(...)):
    """
    Predicts the sentiment of a given text
    """
    payload = dict(data=data)
    response = requests.post(server_url + "/predict",json=payload)
    prediction = response.json().get("prediction")
    response = requests.get(server_url + "/version")
    version = response.json().get("version")
    return templates.TemplateResponse("index.html",{"request": request,"prediction": prediction, "version": version})

@app.get('/')
async def index(request: Request):
    """
    Predicts the sentiment of a given text
    """
    response = requests.get(server_url + "/version")
    version = response.json().get("version")
    return templates.TemplateResponse("index.html",{"request": request, "version": version})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)

