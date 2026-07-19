# AI-Based Crop Disease Detection

This project detects crop diseases using AI and provides disease predictions through a FastAPI backend.

## Features

* Crop disease prediction using AI
* User authentication
* Prediction history
* REST API with CRUD operations
* Search and filter functionality

## Backend API Endpoints

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | /diseases/                    | Get all disease records   |
| GET    | /diseases/{id}                | Get single disease record |
| POST   | /diseases/                    | Create new disease record |
| PUT    | /diseases/{id}                | Update disease record     |
| DELETE | /diseases/{id}                | Delete disease record     |
| GET    | /diseases/search/?crop=Tomato | Search disease records    |
| POST   | /predict                      | Predict crop disease      |

## How to Run Backend Locally

### Clone Repository

```bash
git clone <repository_url>
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create Environment File

Create a `.env` file using `.env.example`.

### Run Backend

```bash
python -m uvicorn app:app --reload
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```
