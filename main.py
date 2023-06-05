from fastapi import FastAPI, Response, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

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


@app.post('/submit/{restaurant_id}')
async def predict(request: Request, restaurant_id: int, data: str = Form(...)):
    """
    Predicts the sentiment of a given text
    """

    payload = dict(data=data)
    response = requests.post(server_url + "/predict/" +
                             str(restaurant_id), json=payload)
    prediction = response.json().get("prediction")
    # redirect to the review page
    return templates.TemplateResponse("review_ok.html", {"prediction": prediction, "request": request})


@app.get('/review_ok')
async def review_ok(request: Request, prediction: str):
    return templates.TemplateResponse("review_ok.html", {"prediction": prediction, "request": request})


@app.get('/review/{restaurant_id}')
async def predict(request: Request, restaurant_id: int):
    response = requests.get(server_url + "/restaurant/" + str(restaurant_id))
    restaurant = response.json()
    restaurant_name = restaurant.get("name")
    restaurant_id = restaurant.get("id")
    return templates.TemplateResponse("review.html", {"restaurant_id": restaurant_id,
                                                      "restaurant_name": restaurant_name,
                                                      "request": request})


@app.get('/reviews/{restaurant_id}')
async def reviews(request: Request, restaurant_id: int):
    """
    Predicts the sentiment of a given text
    """
    response = requests.get(server_url + "/reviews/" + str(restaurant_id))
    json_response = response.json()
    reviews = json_response.get("reviews")
    restaurant_name = json_response.get("restaurant_name")
    return templates.TemplateResponse("reviews.html",
                                      {"restaurant_name": restaurant_name,
                                       "request": request,
                                       "reviews": reviews})


@app.post('/wrong')
async def wrong(request: Request):
    requests.post(server_url + "/wrong")


@app.get('/')
async def index(request: Request):
    """
    Predicts the sentiment of a given text
    """
    response = requests.get(server_url + "/restaurants")
    restaurants = response.json()
    return templates.TemplateResponse("index.html", {"request": request, "restaurants": restaurants})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
