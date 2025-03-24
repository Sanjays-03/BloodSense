from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
import numpy as np
import cv2
from PIL import Image
import io
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Verify model path
MODEL_PATH = "backend/models/fingerprint_model.h5"
if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"Model file not found: {MODEL_PATH}")

# Load trained CNN model
model = load_model(MODEL_PATH)

# Blood group labels (based on dataset folder names)
blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
@app.get("/")
def home():
    return {"message": "Fingerprint Blood Group Detection API"}

@app.post("/predict/")
async def predict_blood_group(file: UploadFile = File(...)):
    try:
        # Read image
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        image = image.resize((128, 128))  # Resize to match model input
        image = np.array(image) / 255.0  # Normalize
        image = np.expand_dims(image, axis=0)  # Reshape for model input

        # Predict blood group
        prediction = model.predict(image)
        predicted_class = blood_groups[np.argmax(prediction)]

        return {"blood_group": predicted_class}

    except Exception as e:
        return {"error": str(e)}
