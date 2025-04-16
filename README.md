# 🔬 Fingerprint Blood Group Detection

This project is a **deep learning-based system** that predicts a person's **blood group** using **fingerprint images**. It includes:

- A **FastAPI backend** for handling fingerprint image uploads and model inference.
- A **Next.js frontend** for an interactive user experience.
- A **Deep Learning model (CNN)** trained to classify fingerprint images into different blood groups.

---

## 🚀 Features

✅ **Upload fingerprint images (.jpg, .bmp, .png, etc.)**
✅ **AI-powered blood group prediction**
✅ **Beautiful UI with animated results display**
✅ **Dockerized setup for easy deployment**

---

## 🛠️ Installation

This guide will walk you through the steps to set up and run the Fingerprint Blood Group Detection system on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+**
- **Node.js (version compatible with Next.js)**
- **npm or yarn** (package managers for Node.js)
- **Docker** (optional, for containerized deployment)
- **pip** (Python package installer)

### Step 1: Clone the Repository

```bash
git clone https://github.com/siddharths060/BloodSense.git
cd fingerprint-blood-group-detection
```

### Step 2: Run the docker compose file

```bash
docker-compose up --build
```

# Fingerprint Blood Group Detection Using Deep Learning

## Methodology

### 1. Data Collection and Preprocessing
- **Data Collection**: Fingerprint images are stored in the `dataset/` directory, organized into subfolders based on blood groups (e.g., `A+`, `B-`, etc.).
- **Preprocessing**:
  - Images are resized to `(128, 128)` pixels to match the input size of the CNN model.
  - Data augmentation is applied using `ImageDataGenerator` to improve model generalization:
    - Rescaling pixel values to `[0, 1]`.
    - Random rotations, shifts, shears, zooms, and flips.
    - Splitting the dataset into 80% training and 20% validation.

### 2. Feature Extraction
- The CNN model automatically extracts features from fingerprint images:
  - **Convolutional Layers**: Detect patterns like ridges and minutiae in fingerprints.
  - **Pooling Layers**: Reduce spatial dimensions while retaining important features.
  - **Fully Connected Layers**: Combine extracted features to classify blood groups.

### 3. Model Training
- **Architecture**:
  - A Sequential CNN model with:
    - 3 convolutional layers (32, 64, 128 filters).
    - MaxPooling layers after each convolution.
    - A fully connected layer with 256 neurons and a dropout layer to prevent overfitting.
    - A final softmax layer for 8-class classification (blood groups).
- **Training**:
  - Optimizer: Adam.
  - Loss Function: Categorical Crossentropy.
  - Metrics: Accuracy.
  - Trained for 15 epochs using the preprocessed dataset.

### 4. Evaluation
- The model is evaluated on the validation set:
  - Accuracy and loss metrics are used to assess performance.
  - Confusion matrices can be generated to analyze misclassifications.

### 5. Prediction
- The FastAPI backend handles predictions:
  - Uploaded fingerprint images are preprocessed (resized, normalized).
  - The trained model predicts the blood group.
  - The result is returned as a JSON response.

## Presentation Highlights

### 1. Project Overview
- **Title**: "Fingerprint Blood Group Detection Using Deep Learning."
- **Objective**: To predict blood groups from fingerprint images using a CNN model.
- **Key Features**:
  - AI-powered blood group prediction.
  - User-friendly interface (Next.js frontend).
  - Dockerized setup for easy deployment.

### 2. Technical Details
- **Data Pipeline**:
  - Explain the preprocessing steps and data augmentation techniques.
- **Model Architecture**:
  - Highlight the CNN layers and their purpose.
  - Show a diagram of the model architecture.
- **Backend**:
  - Mention the use of FastAPI for handling API requests.
  - Explain how the model is integrated into the backend.

### 3. Results
- **Accuracy**:
  - Present the model's accuracy on the validation set.
- **Confusion Matrix**:
  - Show a confusion matrix to visualize correct and incorrect predictions.
- **Demo**:
  - Include a live demo or screenshots of the system in action.

### 4. Challenges and Solutions
- **Challenge**: Misclassification of some fingerprints.
- **Solution**:
  - Collect more diverse data to improve model generalization.
  - Use advanced augmentation techniques to simulate real-world variations.
  - Fine-tune the model with additional layers or hyperparameter optimization.

### 5. Future Work
- **Improving Accuracy**:
  - Train on a larger dataset with more diverse samples.
  - Experiment with transfer learning using pre-trained models.
- **Real-World Deployment**:
  - Integrate with medical systems for practical use.
  - Add security features to ensure data privacy.

## Addressing Misclassifications

### Reasons for Misclassification
- Poor image quality (blurry or noisy images).
- Insufficient training data for certain blood groups.
- Overlapping features between different blood groups.

### Proposed Fixes
- **Data Augmentation**: Add more variations to the training data.
- **Dataset Expansion**: Collect more samples for underrepresented blood groups.
- **Model Improvements**:
  - Use a deeper CNN architecture.
  - Experiment with transfer learning (e.g., ResNet, VGG).
- **Post-Processing**:
  - Add a confidence threshold for predictions.
  - Flag low-confidence predictions for manual review.
