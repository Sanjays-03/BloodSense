# BloodSense Architecture

This document provides a technical breakdown of the BloodSense system architecture, detailing the CNN model structure, preprocessing steps, and overall system design.

## Table of Contents
- [System Overview](#system-overview)
- [CNN Architecture](#cnn-architecture)
- [Data Preprocessing](#data-preprocessing)
- [Training Pipeline](#training-pipeline)
- [Prediction Pipeline](#prediction-pipeline)
- [API and Web Interface](#api-and-web-interface)
- [Performance Optimization](#performance-optimization)

## System Overview

BloodSense follows a microservice architecture with three main components:

1. **Data Processing Module**: Handles image preprocessing, augmentation, and dataset management
2. **Machine Learning Module**: Contains the CNN model for fingerprint analysis and blood group prediction
3. **API Service**: Provides endpoints for inference and interacts with the frontend

![System Architecture Diagram](../Ouput_images/system_architecture.png)

## CNN Architecture

The BloodSense predictive model is based on a Convolutional Neural Network (CNN) specifically designed for image classification tasks.

### Model Architecture Summary

```
Model: Sequential
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
Conv2D-1                     (None, 126, 126, 32)      896       
_________________________________________________________________
MaxPooling2D-1               (None, 63, 63, 32)        0         
_________________________________________________________________
Conv2D-2                     (None, 61, 61, 64)        18,496    
_________________________________________________________________
MaxPooling2D-2               (None, 30, 30, 64)        0         
_________________________________________________________________
Conv2D-3                     (None, 28, 28, 128)       73,856    
_________________________________________________________________
MaxPooling2D-3               (None, 14, 14, 128)       0         
_________________________________________________________________
Flatten                      (None, 25088)             0         
_________________________________________________________________
Dense-1                      (None, 256)               6,422,784 
_________________________________________________________________
Dropout                      (None, 256)               0         
_________________________________________________________________
Dense-2 (Output)             (None, 8)                 2,056     
=================================================================
Total params: 6,518,088
Trainable params: 6,518,088
Non-trainable params: 0
_________________________________________________________________
```

### Layer-by-Layer Explanation

1. **Input Layer**: 
   - Shape: `(128, 128, 3)` - RGB images resized to 128×128 pixels

2. **First Convolutional Block**:
   - Conv2D: 32 filters, 3×3 kernel size, ReLU activation
   - MaxPooling2D: 2×2 pool size, reduces spatial dimensions by half

3. **Second Convolutional Block**:
   - Conv2D: 64 filters, 3×3 kernel size, ReLU activation
   - MaxPooling2D: 2×2 pool size, further dimension reduction

4. **Third Convolutional Block**:
   - Conv2D: 128 filters, 3×3 kernel size, ReLU activation
   - MaxPooling2D: 2×2 pool size, final spatial reduction

5. **Feature Processing**:
   - Flatten: Converts 3D feature maps to 1D feature vector
   - Dense: 256 neurons, ReLU activation, for high-level feature learning
   - Dropout: 50% rate, prevents overfitting

6. **Output Layer**:
   - Dense: 8 neurons (one per blood group class)
   - Softmax activation: Outputs probability distribution across classes

### Model Code

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128, 128, 3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(8, activation='softmax')  # 8 blood group classes
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
```

## Data Preprocessing

The system employs several preprocessing techniques to enhance model performance:

### Image Preprocessing

1. **Resizing**: All images are resized to 128×128 pixels to ensure consistent input dimensions
2. **Normalization**: Pixel values are scaled to the range [0,1] by dividing by 255
3. **Color Handling**: Images are converted to RGB format (3 channels)

### Data Augmentation

To increase the effective size of the training dataset and improve model robustness, the following augmentations are applied during training:

1. **Rotation**: Images are randomly rotated by up to ±10 degrees
2. **Width/Height Shift**: Random shifts by up to 10% in horizontal and vertical directions
3. **Shear Transformation**: Random shear by up to 10% 
4. **Zoom**: Random zoom by up to 10%
5. **Horizontal Flip**: Random horizontal flipping

### Augmentation Code

```python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True,
    validation_split=0.2  # 80-20 train-test split
)
```

## Training Pipeline

### Data Flow

1. **Data Loading**: Images are loaded from the dataset directory structure
2. **Train-Validation Split**: 80% of data used for training, 20% for validation
3. **Batch Processing**: Images are processed in batches of 32 during training
4. **Augmentation**: Data augmentation applied on-the-fly to training data

### Training Parameters

- **Optimizer**: Adam with default learning rate (0.001)
- **Loss Function**: Categorical Cross-Entropy
- **Metrics**: Accuracy
- **Epochs**: 15
- **Batch Size**: 32

### Training Code

```python
# Load preprocessed data
train_data, val_data = load_data()

# Train model
model.fit(
    train_data,
    validation_data=val_data,
    epochs=15
)

# Save model
model.save("backend/models/fingerprint_model.h5")
```

## Prediction Pipeline

During inference, the following steps are performed:

1. **Image Loading**: Input fingerprint image is loaded
2. **Preprocessing**:
   - Conversion to RGB format
   - Resizing to 128×128 pixels
   - Normalization (division by 255)
   - Reshaping to match model input (adding batch dimension)
3. **Prediction**: Forward pass through the CNN model
4. **Post-processing**: Converting the output probability distribution to a predicted blood group

```python
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
```

## API and Web Interface

### FastAPI Backend

The system uses FastAPI to serve the model, providing:

1. **REST API Endpoints**:
   - `GET /`: Health check endpoint
   - `POST /predict/`: Endpoint for blood group prediction from fingerprint images

2. **CORS Configuration**: The API is configured to accept cross-origin requests from the frontend

3. **Data Validation**: Automatic validation of uploaded files

### Next.js Frontend

The frontend provides:

1. **User Interface**: Clean and intuitive interface for uploading fingerprint images
2. **Results Display**: Visualization of predicted blood groups
3. **Responsive Design**: Works across various device sizes

## Performance Optimization

Several optimizations are implemented to improve system performance:

1. **Model Quantization**: Reduces model size while maintaining accuracy
2. **Eager Loading**: Model is loaded once at server start to avoid repeated loading
3. **Batch Processing**: Images are processed in batches for efficient training
4. **Caching**: Common resources are cached to reduce computational overhead

---

This architecture is designed to provide a balance between accuracy, speed, and resource utilization, making BloodSense suitable for both research and practical applications.
