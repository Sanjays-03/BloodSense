# Installation Guide for BloodSense

This document provides step-by-step instructions for setting up the BloodSense environment, installing dependencies, and preparing to run the fingerprint blood group prediction system.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installing Dependencies](#installing-dependencies)
- [Dataset Setup](#dataset-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running with Docker](#running-with-docker)
- [Common Issues](#common-issues)

## Prerequisites

Before starting the installation process, ensure you have the following:

- **Operating System**: Windows, macOS, or Linux (Ubuntu 18.04+ recommended)
- **Hardware**: 
  - CPU: 4+ cores (8+ recommended)
  - RAM: 8GB minimum (16GB recommended)
  - Storage: At least 2GB free space for code, model, and datasets
  - GPU: Optional but recommended for faster model training (NVIDIA CUDA-compatible)
- **Software**:
  - Git
  - Python 3.8+
  - Node.js (14.0+) and npm for frontend
  - Docker and Docker Compose (optional, for containerized deployment)

## Environment Setup

### Option 1: Using Python Virtual Environment

1. Clone the repository and navigate to the project root:

```bash
git clone https://github.com/siddharths060/BloodSense.git
cd BloodSense
```

2. Create a Python virtual environment:

```bash
python -m venv backendvenv
```

3. Activate the virtual environment:

**On Windows:**
```bash
backendvenv\\Scripts\\activate
```

**On macOS/Linux:**
```bash
source backendvenv/bin/activate
```

### Option 2: Using Anaconda

1. Clone the repository and navigate to the project root:

```bash
git clone https://github.com/siddharths060/BloodSense.git
cd BloodSense
```

2. Create a new Anaconda environment:

```bash
conda create -n bloodsense python=3.9
conda activate bloodsense
```

## Installing Dependencies

Once your environment is set up and activated, install the required packages:

```bash
pip install -r requirements.txt
```

Key dependencies include:
- TensorFlow 2.9.0
- FastAPI
- Uvicorn
- NumPy
- OpenCV
- Pillow (PIL)

## Dataset Setup

The BloodSense model is trained on fingerprint images organized by blood groups. The dataset should be organized as follows:

```
dataset/
├── A+/
│   ├── image1.BMP
│   ├── image2.BMP
│   └── ...
├── A-/
├── B+/
├── B-/
├── AB+/
├── AB-/
├── O+/
└── O-/
```

To set up your own dataset:

1. Create the dataset directory structure if it doesn't exist:

```bash
mkdir -p dataset/{A+,A-,B+,B-,AB+,AB-,O+,O-}
```

2. Place your fingerprint images in their respective blood group directories.

3. If you have a custom dataset or want to use a different dataset structure, you will need to modify the `DATASET_PATH` variable in `backend/preprocess.py`.

## Training the Model

If you want to train the model from scratch or retrain it with your own data:

1. Ensure your dataset is properly set up as described above.

2. Run the training script:

```bash
cd backend
python train_model.py
```

This will:
- Load and preprocess the dataset
- Train the CNN model using the specified parameters
- Save the trained model to `backend/models/fingerprint_model.h5`

Training typically takes 30-60 minutes depending on your hardware, dataset size, and the number of epochs.

## Backend Setup

1. Make sure you're in the project root directory and your virtual environment is activated.

2. Verify that the model file exists:

```bash
ls -la backend/models/fingerprint_model.h5
```

If the model file doesn't exist, either:
- Train the model as described above, or
- Download the pre-trained model from [our releases page](https://github.com/siddharths060/BloodSense/releases) and place it in the `backend/models/` directory.

3. Start the FastAPI backend server:

```bash
cd backend
uvicorn main:app --reload
```

The API should now be running at http://127.0.0.1:8000.

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install JavaScript dependencies:

```bash
npm install
```

3. Start the Next.js development server:

```bash
npm run dev
```

The frontend should now be running at http://localhost:3000.

## Running with Docker

For a containerized deployment:

```bash
docker-compose up --build
```

This will:
- Build and start both frontend and backend containers
- Expose the frontend on http://localhost:3000
- Expose the backend API on http://localhost:8000

## Common Issues

### Model Not Found Error

If you see `RuntimeError: Model file not found`, ensure:
- The model file exists in `backend/models/fingerprint_model.h5`
- You're running the commands from the correct directory

### Package Import Errors

If you encounter import errors, check:
- Your virtual environment is activated
- All dependencies are installed: `pip install -r requirements.txt`
- You're using the correct Python version (3.8+)

### CUDA/GPU Issues

If you're trying to use GPU acceleration and encounter issues:
- Check your CUDA and cuDNN versions are compatible with your TensorFlow version
- Verify GPU is correctly recognized: `python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"`

### Dataset Issues

If the training script can't find the dataset:
- Check the dataset path in `backend/preprocess.py`
- Ensure the dataset directory structure matches what the code expects

For more help, please [open an issue](https://github.com/siddharths060/BloodSense/issues) on our GitHub repository.
