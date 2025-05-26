# Contributing to BloodSense

Thank you for considering contributing to BloodSense! This document outlines the process for contributing to the project and how to get started as a contributor.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Pull Request Process](#pull-request-process)
6. [Style Guidelines](#style-guidelines)
7. [Testing](#testing)
8. [Documentation](#documentation)
9. [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read and follow it to ensure a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites

Before you begin contributing, make sure you have:

- Python 3.8 or higher installed
- Git installed
- A GitHub account
- Familiarity with Git and GitHub workflow

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your forked repository:
   ```
   git clone https://github.com/YOUR-USERNAME/BloodSense.git
   ```
3. Navigate to the project directory:
   ```
   cd BloodSense
   ```
4. Set up a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
5. Install development dependencies:
   ```
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # If available
   ```
6. Add the original repository as an upstream remote:
   ```
   git remote add upstream https://github.com/original-owner/BloodSense.git
   ```

## How to Contribute

### Reporting Bugs

When reporting bugs, please include:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Your environment (OS, Python version, dependencies)

Please use the bug report template when creating an issue.

### Suggesting Features

Feature suggestions are welcome! Please provide:

1. A clear, descriptive title
2. Detailed description of the proposed feature
3. Any relevant examples or mock-ups
4. Rationale for why this feature would benefit the project

### Working on Issues

1. Find an issue you'd like to work on
2. Comment on the issue to indicate you're working on it
3. Create a branch with a descriptive name (e.g., `feature/new-preprocessing-technique` or `fix/model-accuracy-issue`)
4. Work on your changes locally
5. Submit a pull request when ready

## Development Workflow

1. Ensure your fork is up to date:
   ```
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
2. Create a new branch for your feature or bugfix:
   ```
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, following the style guidelines
4. Write or update tests as needed
5. Run the test suite to ensure all tests pass
6. Update documentation if necessary
7. Commit your changes with clear, descriptive commit messages

## Pull Request Process

1. Push your changes to your fork:
   ```
   git push origin feature/your-feature-name
   ```
2. Open a pull request against the main repository
3. Fill out the pull request template completely
4. Wait for code review and address any feedback
5. Once approved, your pull request will be merged

### Pull Request Guidelines

- Keep pull requests focused on a single issue or feature
- Include tests for new features or bug fixes
- Update documentation as needed
- Follow the style guidelines
- Make sure all tests pass

## Style Guidelines

### Python Code Style

- Follow PEP 8 guidelines
- Use meaningful variable and function names
- Include docstrings for all functions, classes, and modules
- Use type hints where appropriate
- Keep functions short and focused on a single task

### Commit Messages

- Start with a short, clear summary (50 chars or less)
- Use the imperative mood ("Add feature" not "Added feature")
- Reference issues and pull requests when relevant
- Include more detailed description after the summary if necessary

## Testing

- All new features should include appropriate tests
- Bug fixes should include tests that reproduce the fixed bug
- Run the full test suite before submitting a pull request:
  ```
  pytest
  ```
- Aim for high test coverage of your code

## Documentation

- Update documentation for any features you modify or add
- Follow the existing documentation style
- Document both API and user-facing features
- Include examples when helpful

## Community

- Join our [community chat/forum/mailing list]
- Follow our [Twitter/social media accounts]
- Attend our [meetups/conferences] if available

Thank you for contributing to BloodSense! Your efforts help make this project better for everyone.
