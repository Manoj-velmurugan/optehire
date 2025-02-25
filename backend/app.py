from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:5173",  # Your React frontend (adjust if running on a different port or domain)
    "http://127.0.0.1:5173",  # Alternative for localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# RapidAPI Configuration
RAPIDAPI_KEY = "b120d9c547mshc0b3727e0b808adp1b1c8djsn79e677086a2b"  # Replace with your key
BASE_URL = "https://jsearch.p.rapidapi.com/search"
HEADERS = {
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
    "x-rapidapi-key": RAPIDAPI_KEY
}

# Pydantic Models
class JobListing(BaseModel):
    title: str
    company: str
    location: str
    job_type: Optional[str]
    posted: Optional[str]
    salary: Optional[str]
    job_url: Optional[str]

class StructuredResponse(BaseModel):
    success: bool
    count: int
    results: List[JobListing]

# API Fetch Function
def fetch_jobs(query="software development", page=1, num_pages=10, country="IN", date_posted="3days"):
    params = {
        "query": query,
        "page": page,
        "num_pages": num_pages,
        "country": country,
        "date_posted": date_posted
    }
    response = requests.get(BASE_URL, headers=HEADERS, params=params)
    return response.json().get("data", []) if response.status_code == 200 else []

# Modified Endpoint with "Not Specified" for Missing Salary
@app.get("/jobs/", response_model=StructuredResponse)
async def get_jobs(
    query: str = Query("software development"),
    page: int = Query(1, ge=1),
    num_pages: int = Query(10, ge=1),
    country: str = Query("IND"),
    date_posted: str = Query("3days")
):
    raw_data = fetch_jobs(query, page, num_pages, country, date_posted)

    structured_results = []
    for job in raw_data[:21]:
        # Construct salary string; use "Not Specified" if no meaningful data
        min_salary = job.get("job_min_salary")
        max_salary = job.get("job_max_salary")
        currency = job.get("job_salary_currency")
        
        if min_salary or max_salary:  # If either min or max salary exists
            salary = f"{min_salary or 'N/A'} - {max_salary or 'N/A'} {currency or ''}".strip()
        else:
            salary = "Not Specified"  # Default when no salary data is available

        structured_results.append(JobListing(
            title=job.get("job_title", "Not Available"),
            company=job.get("employer_name", "Not Available"),
            location=f"{job.get('job_city', '')} {job.get('job_country', '')}".strip(),
            job_type=job.get("job_employment_type"),
            posted=job.get("job_posted_at_datetime_utc"),
            salary=salary,
            job_url=job.get("job_apply_link")
        ))

    return {
        "success": True,
        "count": len(structured_results),
        "results": structured_results
    }