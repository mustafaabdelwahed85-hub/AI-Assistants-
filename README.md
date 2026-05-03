# Local AI Assistant 🤖

A simple local AI web application built with FastAPI and Ollama.

The project demonstrates how to run a local LLM, connect it to a Python API, and build a clean web interface for AI-powered features.

## Features

- Ask AI using a local LLM
- Job Analyzer AI Agent
- FastAPI backend
- Ollama local model integration
- Modern HTML, CSS, and JavaScript UI
- Clean result formatting
- Copy result button

## Tech Stack

- Python
- FastAPI
- Ollama
- Llama3
- HTML
- CSS
- JavaScript

## 🚀 Installation

Follow these steps to run the project locally:

git clone https://github.com/mustafaabdelwahed85-hub/AI-Assistants-.git
cd AI-Assistants-
python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
# source venv/bin/activate

pip install -r requirements.txt
ollama run llama3

uvicorn main:app --reload

http://127.0.0.1:8000

## Project Structure

```text
AI-Assistants-/
│── main.py
│── README.md
│── requirements.txt
│── templates/
│   └── index.html
│── static/
│   ├── style.css
│   └── script.js
