# BloodSense Usage Guide

This document provides comprehensive instructions for using the BloodSense system to predict blood groups from fingerprint images.

## Table of Contents
- [Getting Started](#getting-started)
- [Using the Web Interface](#using-the-web-interface)
- [Using the API Directly](#using-the-api-directly)
- [Command Line Interface](#command-line-interface)
- [Expected Inputs and Outputs](#expected-inputs-and-outputs)
- [File Structure and Data Placement](#file-structure-and-data-placement)
- [Troubleshooting](#troubleshooting)

## Getting Started

Before using BloodSense, ensure that:
1. You have installed the system following the [Installation Guide](INSTALLATION.md)
2. The backend server is running (either via `uvicorn` or Docker)
3. For web interface: the frontend is running (either via `npm` or Docker)

## Using the Web Interface

The BloodSense web interface provides a user-friendly way to upload fingerprint images and get blood group predictions.

1. **Access the Web Interface**:
   - Open your browser and navigate to http://localhost:3000

2. **Upload a Fingerprint Image**:
   - Click on the "Upload Image" button
   - Select a fingerprint image from your local machine (.jpg, .png, or .bmp format)
   - Click "Submit" to upload the image

3. **View Results**:
   - The system will process the image and display the predicted blood group
   - The result page will show:
     - The uploaded fingerprint image
     - The predicted blood group (e.g., "A+", "B-", etc.)
     - Confidence score (if available)
     - Information about the predicted blood group

4. **Start Again**:
   - To analyze another fingerprint, click the "New Analysis" button

## Using the API Directly

For programmatic access or integration with other systems, you can use the BloodSense API directly.

### Endpoint: `/predict/`

- Method: `POST`
- Content-Type: `multipart/form-data`
- Field Name: `file` (containing the fingerprint image data)

### Example API Calls

**Using cURL:**

```bash
curl -X POST "http://localhost:8000/predict/" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/fingerprint.jpg"
```

**Using Python Requests:**

```python
import requests

url = "http://localhost:8000/predict/"
files = {"file": open("fingerprint.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

### API Response Format

A successful API response will be in JSON format:

```json
{
  "blood_group": "A+"
}
```

In case of an error:

```json
{
  "error": "Error description here"
}
```

## Command Line Interface

For batch processing or scripted usage, you can use the included Python script:

```bash
# Navigate to the backend directory
cd backend

# Run the CLI script
python cli.py --image /path/to/your/fingerprint.jpg
```

Additional CLI options:

```bash
python cli.py --help
# Output:
# usage: cli.py [-h] --image IMAGE [--model MODEL] [--output OUTPUT]
# 
# BloodSense CLI
# 
# optional arguments:
#   -h, --help       show this help message and exit
#   --image IMAGE    Path to the fingerprint image
#   --model MODEL    Path to the model file (default: models/fingerprint_model.h5)
#   --output OUTPUT  Output format: text, json (default: text)
```

## Expected Inputs and Outputs

### Input Requirements

- **Image Format**: JPG, PNG, or BMP
- **Image Content**: Clear fingerprint image
- **Image Size**: Any size (the system will resize to 128×128 pixels)
- **Color**: Both color and grayscale images are accepted

### Output Format

The system outputs the predicted blood group as one of the following classes:
- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

## File Structure and Data Placement

Understanding the project structure helps when working with BloodSense:

```
BloodSense/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── preprocess.py        # Data preprocessing
│   ├── train_model.py       # Model training script
│   └── models/
│       └── fingerprint_model.h5  # Trained model file
├── frontend/               # Next.js frontend
├── dataset/                # Training dataset directory
│   ├── A+/
│   ├── A-/
│   ├── B+/
│   ├── B-/
│   ├── AB+/
│   ├── AB-/
│   ├── O+/
│   └── O-/
└── docs/                   # Documentation
```

### Where to Place Files

- **Training Images**: Place in the corresponding blood group folder in `dataset/`
- **Test Images**: Can be placed anywhere when using the web interface or API
- **Custom Models**: Place in `backend/models/` and update the path in the code if needed

## Troubleshooting

### Common Issues

1. **Invalid Image Format**:
   - Ensure the image is in JPG, PNG, or BMP format
   - Try preprocessing the image to enhance quality

2. **API Connection Issues**:
   - Verify the backend server is running
   - Check the API URL is correct

3. **Incorrect Predictions**:
   - Make sure the fingerprint image is clear and centered
   - Check if the image has good contrast and isn't blurry
   - Consider rotating the image if the fingerprint is at an odd angle

### Logging

For detailed logs to help diagnose issues:

1. **Backend Logs**:
   ```bash
   # Set environment variable for detailed logs
   export LOG_LEVEL=DEBUG
   
   # Then run the server
   uvicorn backend.main:app --reload
   ```

2. **Frontend Logs**:
   - Open browser developer tools when using the web interface
   - Check the Console and Network tabs for errors

For more assistance, please [open an issue](https://github.com/siddharths060/BloodSense/issues) on our GitHub repository.
