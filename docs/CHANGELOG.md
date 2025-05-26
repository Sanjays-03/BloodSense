# Changelog

All notable changes to the BloodSense project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Multi-language support for the web interface
- Mobile application development
- Integration with healthcare management systems
- Federated learning capabilities for distributed model training

## [1.0.0] - 2023-12-15
### Added
- Initial release of BloodSense
- Convolutional Neural Network (CNN) model for blood group prediction
- RESTful API for model inference
- Web interface for uploading fingerprint images
- Pre-trained model with >92% accuracy
- Comprehensive documentation

### Fixed
- Issue with image preprocessing for low-resolution scans
- Memory leak in the prediction pipeline
- Compatibility issues with different fingerprint scanner outputs

## [0.9.0] - 2023-11-01
### Added
- Beta version released for testing
- Core CNN architecture implementation
- Initial dataset preprocessing pipeline
- Basic API functionality
- Preliminary web interface

### Changed
- Optimized model architecture from ResNet-based to custom CNN
- Improved data augmentation techniques for better generalization
- Enhanced preprocessing for various image qualities

### Fixed
- Model overfitting issues
- Inconsistent prediction results for certain blood groups

## [0.8.0] - 2023-09-15
### Added
- Alpha version for internal testing
- Proof of concept model
- Initial dataset collection and labeling
- Basic preprocessing functions
- Command-line interface for testing

### Changed
- Switched from SVM to CNN approach after initial testing
- Revised data collection methodology
- Updated feature extraction techniques

## [0.7.0] - 2023-07-30
### Added
- Research prototype
- Feasibility study completed
- Preliminary results and accuracy metrics
- Initial system architecture design

## Project Milestones

| Version | Date       | Milestone                                       |
|---------|------------|------------------------------------------------|
| 0.7.0   | 2023-07-30 | Research prototype and feasibility demonstration|
| 0.8.0   | 2023-09-15 | Alpha version with basic functionality          |
| 0.9.0   | 2023-11-01 | Beta version with improved model architecture   |
| 1.0.0   | 2023-12-15 | Initial public release                          |
| 1.1.0   | 2024-Q1    | Performance optimization and expanded dataset   |
| 2.0.0   | 2024-Q3    | Enhanced model with extended capabilities       |

## Version Naming Convention

BloodSense follows semantic versioning:

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

Example: 1.2.3
- 1 = Major version
- 2 = Minor version
- 3 = Patch

## Deprecation Policy

Features marked as deprecated will be supported for at least one minor version before removal. Deprecation notices will be clearly documented in the changelog.
