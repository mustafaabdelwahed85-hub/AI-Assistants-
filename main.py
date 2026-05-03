from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import requests

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class JobRequest(BaseModel):
    job_description: str


class AskRequest(BaseModel):
    prompt: str


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/ask")
def ask(data: AskRequest):
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "llama3",
            "messages": [{"role": "user", "content": data.prompt}],
            "stream": False
        }
    )

    result = response.json()
    return {"answer": result["message"]["content"]}


@app.post("/job-agent")
def job_agent(data: JobRequest):
    prompt = f"""
You are a job matching assistant.

Analyze this job description:
{data.job_description}

Return:
1. Key required skills
2. Missing skills for a junior developer
3. Simple preparation plan
"""

    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "llama3",
            "messages": [{"role": "user", "content": prompt}],
            "stream": False
        }
    )

    result = response.json()
    return {"answer": result["message"]["content"]}