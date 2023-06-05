FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 3000

ENV MODEL_SERVICE_URL="http://model-service:8000"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
