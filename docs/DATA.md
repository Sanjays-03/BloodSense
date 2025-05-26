# BloodSense Dataset Documentation

This document describes the dataset used to train the BloodSense model, including its structure, sources, preprocessing techniques, and guidelines for expanding the dataset to improve model performance.

## Table of Contents
- [Dataset Overview](#dataset-overview)
- [Dataset Structure](#dataset-structure)
- [Data Collection](#data-collection)
- [Data Preprocessing](#data-preprocessing)
- [Dataset Statistics](#dataset-statistics)
- [Adding New Data](#adding-new-data)
- [Data Quality Guidelines](#data-quality-guidelines)
- [Ethical Considerations](#ethical-considerations)

## Dataset Overview

The BloodSense fingerprint dataset consists of fingerprint images categorized by blood groups. These images are used to train a CNN model to predict blood groups based on fingerprint patterns. The dataset includes a diverse range of fingerprints to ensure model robustness and generalization.

Key characteristics:
- **Number of Classes**: 8 (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Image Format**: BMP (Bitmap)
- **Resolution**: Various (standardized during preprocessing)
- **Color Space**: Grayscale (converted to RGB during preprocessing)

## Dataset Structure

The dataset follows a hierarchical structure, with top-level directories representing blood group classes:

```
dataset/
├── A+/
│   ├── cluster_1_001.BMP
│   ├── cluster_1_002.BMP
│   └── ...
├── A-/
│   ├── cluster_1_101.BMP
│   ├── cluster_1_102.BMP
│   └── ...
├── B+/
├── B-/
├── AB+/
├── AB-/
├── O+/
└── O-/
```

Each blood group directory contains BMP files representing fingerprint images of individuals with that blood group. The naming convention follows the pattern: `cluster_<group>_<id>.BMP`.

## Data Collection

### Collection Methods

The fingerprint images in this dataset were collected using:

1. **Digital Scanners**: High-resolution optical fingerprint scanners
2. **Controlled Environment**: Consistent lighting and pressure conditions
3. **Volunteer Participation**: Data collected with informed consent
4. **Blood Group Verification**: Blood groups verified through standard laboratory tests

### Source Attribution

The dataset is a compilation from multiple sources:

1. Public fingerprint databases with blood group annotations
2. Research partnerships with medical institutions
3. Volunteer contributions with verified blood group information

> **Note**: Due to privacy considerations, detailed source information for specific images is maintained in a separate, access-controlled document.

## Data Preprocessing

Before being used for training, all images undergo several preprocessing steps:

### Initial Processing

1. **Quality Assessment**: Low-quality fingerprints are removed
2. **Noise Reduction**: Minor image filtering to reduce noise
3. **Format Standardization**: All images converted to standard BMP format

### Training Preparation

1. **Resizing**: All images are resized to 128×128 pixels
2. **Normalization**: Pixel values scaled to [0,1] range
3. **Channel Conversion**: Grayscale images are converted to 3-channel RGB
4. **Augmentation**: Data augmentation techniques applied during training:
   - Random rotations (±10°)
   - Random shifts (±10%)
   - Random zoom (±10%)
   - Horizontal flips

## Dataset Statistics

### Class Distribution

| Blood Group | Number of Images | Percentage |
|-------------|------------------|------------|
| A+          | ~500             | ~15%       |
| A-          | ~300             | ~9%        |
| B+          | ~600             | ~17%       |
| B-          | ~250             | ~7%        |
| AB+         | ~300             | ~9%        |
| AB-         | ~200             | ~6%        |
| O+          | ~850             | ~24%       |
| O-          | ~450             | ~13%       |
| **Total**   | **~3450**        | **100%**   |

### Quality Metrics

- **Resolution Range**: Original images range from 256×256 to 512×512 pixels
- **Average Clarity Score**: 0.82/1.0 (custom metric based on ridge definition)
- **Noise Level**: Low to medium

## Adding New Data

To expand the dataset and improve model performance:

### Collection Guidelines

1. **Equipment**: Use an optical fingerprint scanner with at least 500 DPI resolution
2. **Procedure**: 
   - Clean the scanner surface before each capture
   - Apply consistent pressure
   - Capture the central part of the fingerprint
   - Obtain multiple samples per individual if possible
3. **Blood Group Verification**: Document the method used to verify blood groups

### Preprocessing New Images

1. **Format**: Convert images to BMP format
2. **Naming Convention**: Follow the pattern `cluster_<group>_<id>.BMP`
3. **Placement**: Add the images to the appropriate blood group folder in the dataset directory

### Retraining the Model

After adding new data:

```bash
# Navigate to the backend directory
cd backend

# Run the training script
python train_model.py
```

## Data Quality Guidelines

To ensure high-quality data that will improve model performance:

### Image Quality

- **Resolution**: Minimum 300 DPI (500+ DPI preferred)
- **Focus**: Sharp and clear ridge patterns
- **Contrast**: Good contrast between ridges and valleys
- **Coverage**: Central fingerprint area should be fully captured

### Metadata Requirements

Each image should have associated metadata (stored separately) including:
- Blood group verification method
- Collection date
- Scanner type
- Anonymous demographic information (age group, gender)

## Ethical Considerations

### Privacy

- All fingerprint images are anonymized
- No personally identifiable information is stored with the images
- Contributors have provided informed consent for research use

### Bias Mitigation

- Efforts are made to ensure demographic diversity in the dataset
- Collection protocols aim to minimize collection bias
- Regular audit of model predictions across different demographics

### Usage Restrictions

This dataset is intended for:
- Research purposes
- Educational use
- Development of the BloodSense system

It should not be used for:
- Identification or authentication systems
- Law enforcement purposes
- Any application beyond blood group prediction

## References

1. Ross, A., & Jain, A. (2004). Biometric sensor interoperability: A case study in fingerprints. In Biometric Authentication (pp. 134-145). Springer.
2. Maltoni, D., Maio, D., Jain, A. K., & Prabhakar, S. (2009). Handbook of fingerprint recognition. Springer Science & Business Media.
3. Yager, N., & Amin, A. (2004). Fingerprint classification: A review. Pattern Analysis and Applications, 7(1), 77-93.
