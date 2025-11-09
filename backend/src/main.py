"""
If you are deploying on Vercel, you can delete this file.

This app puts together the frontend UI and backend API for deployment on Render.
For local development, the app for just the API should be run on its own:
$ fastapi dev src/api.py

The provided Dockerfile will handle putting everything together for deployment.
When used, the application bundle from building the React app with `npm run build`
is placed at the public directory defined below for FastAPI to serve as static assets.
That means any requests for existing files will be served the contents of those files,
and any requests for the API paths will be sent to the API routes defined in the API.
"""

from pathlib import Path

from fastapi import FastAPI, Request, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from firebase_config import db, auth


import api  

PUBLIC_DIRECTORY = Path("public")

# Create a main app under which the API will be mounted as a sub-app
app = FastAPI()

# Send all requests to paths under `/api/*` to the API router
app.mount("/api/", api.app)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Make the public files (HTML, JS, CSS, etc.) accessible on the server
# With HTML mode, `index.html` is automatically loaded
# app.mount("/", StaticFiles(directory=PUBLIC_DIRECTORY, html=True), name="public")


@app.exception_handler(status.HTTP_404_NOT_FOUND)
async def not_found(req: Request, exc: HTTPException) -> FileResponse:
    """
    Serve the frontend app for all other requests not directed to `/api/` or `/`.

    This allows the single-page application to do client-side routing where the browser
    process the URL path in the React App. Otherwise, users would see 404 Not Found when
    navigating directly to a virtual path.

    This should be removed if the frontend app does not handle different URL paths.
    """
    return FileResponse(PUBLIC_DIRECTORY / "index.html")


@app.get("/")
def root():
    return {"message": "FastAPI + Firebase connected!"}

@app.post("/users/{uid}")
def get_user(uid: str):
    try:
        user = auth.get_user(uid)
        return {"uid": user.uid, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/data")
def get_data():
    docs = db.collection("users").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]