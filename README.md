# 🌱 AI Crop Disease Detection System

An AI-powered web application that helps farmers identify crop diseases by uploading images of plant leaves. The system predicts the disease, provides confidence scores, and suggests treatment and prevention methods using a machine learning model.

## 🚀 Features

- 🌿 Upload crop leaf images
- 🤖 AI-based disease prediction
- 📊 Confidence score for each prediction
- 💊 Disease description, treatment, and prevention suggestions
- 🔐 User Authentication (JWT)
- 📜 Prediction history
- 🌍 Responsive and user-friendly interface
- ⚡ FastAPI backend with REST APIs
- 💾 MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend
- React.js / Next.js
- HTML
- CSS
- JavaScript
- Axios

### Backend
- FastAPI
- Python
- JWT Authentication
- Pydantic

### Database
- MongoDB

### AI / Machine Learning
- TensorFlow / Keras
- Plant Disease Classification Model

---

## 📁 Project Structure

```
AI-Crop-Disease-Detection/
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── components/
│   ├── package.json
│   └── ...
│
├── dataset/
├── notebooks/
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/anshulmall06/AI-Crop-Disease-Detection.git
cd AI-Crop-Disease-Detection
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
GOOGLE_API_KEY=your_google_api_key
```

> **Note:** Never commit your `.env` file to GitHub.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User Login |

### Prediction

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/predict` | Predict crop disease |
| GET | `/predictions` | Get prediction history |
| GET | `/predictions/{id}` | Get prediction by ID |
| PUT | `/predictions/{id}` | Update prediction |
| DELETE | `/predictions/{id}` | Delete prediction |

---

## Workflow

1. User registers or logs in.
2. Uploads a crop leaf image.
3. AI model processes the image.
4. Disease prediction is generated.
5. Confidence score is displayed.
6. Treatment and prevention suggestions are provided.
7. Prediction history is stored for future reference.

---

## Future Enhancements

- 📱 Mobile Application
- 🌐 Multi-language Support
- ☁️ Cloud Deployment
- 📷 Real-time Camera Detection
- 📈 Analytics Dashboard
- 🌾 Support for More Crop Species

---

## Contributors

**Anshul Mall**

GitHub: https://github.com/anshulmall06

---

## License

This project is developed for educational and internship purposes.
