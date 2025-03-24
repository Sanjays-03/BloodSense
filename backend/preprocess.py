import os
import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = (128, 128)
DATASET_PATH = "../dataset"

# Define data augmentation
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

def load_data():
    train_data = datagen.flow_from_directory(
        DATASET_PATH,
        target_size=IMG_SIZE,
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )

    val_data = datagen.flow_from_directory(
        DATASET_PATH,
        target_size=IMG_SIZE,
        batch_size=32,
        class_mode='categorical',
        subset='validation'
    )

    # Print some sample data
    print("Classes found:", train_data.class_indices)  # Print class labels
    sample_images, sample_labels = next(train_data)
    print(f"Sample batch shape: {sample_images.shape}")
    
    return train_data, val_data

# Execute function
load_data()
