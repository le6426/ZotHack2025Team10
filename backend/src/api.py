"""
This file defines the FastAPI app for the API and all of its routes.
To run this API, use the FastAPI CLI
$ fastapi dev src/api.py
"""

import random

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from firebase_config import db, auth

# The app which manages all of the API routes
app = FastAPI()


# The decorator declares the function as a FastAPI route on the given path.
# This route in particular is a GET route at "/hello" which returns the example
# dictionary as a JSON response with the status code 200 by default.
@app.get("/hello")
async def hello() -> dict[str, str]:
    """Get hello message."""
    return {"message": "Hello from FastAPI"}


# The route can also handle query parameters encoded in the URL after the path,
# e.g. `/random?maximum=1000`
# If the value isn't an integer, FastAPI will return an error response
# with a validation error describing the invalid input.
@app.get("/random")
async def get_random_item(maximum: int) -> dict[str, int]:
    """Get an item with a random ID."""
    return {"itemId": random.randint(0, maximum)}

@app.get("/petrdrops")
def get_petrdrops():
    """
    Fetch all documents from 'petrdrops' collection.
    """
    try:
        docs = db.collection("petrdrops").stream()
        petrdrops = [{"id": doc.id, **doc.to_dict()} for doc in docs]
        return petrdrops
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/petrdrops/{quarter_id}")
def get_quarter(quarter_id: str):
    """
    Fetch a single quarter document by ID.
    """
    try:
        doc = db.collection("petrdrops").document(quarter_id).get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Quarter not found")
        return {"id": doc.id, **doc.to_dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/petrdrops/{quarter_id}/{week_number}")
def get_week(quarter_id: str, week_number: str):
    """
    Fetch all documents inside a specific week subcollection (like 'weekSix')
    under a given 'petrdrops' document.
    """
    try:
        # Access the subcollection by name dynamically (week_number)
        docs = db.collection("petrdrops").document(quarter_id).collection(week_number).stream()
        week_docs = [{"id": doc.id, **doc.to_dict()} for doc in docs]
        return week_docs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/petrdrops/{quarter_id}/{week_number}/{drop_id}")
def get_drop(quarter_id: str, week_number: str, drop_id: str):
    """
    Fetch a specific drop document inside a week collection inside a petrdrops document.
    """
    try:
        drop_doc_ref = db.collection("petrdrops") \
                        .document(quarter_id) \
                        .collection(week_number) \
                        .document(drop_id)
        drop_doc = drop_doc_ref.get()
        if not drop_doc.exists:
            raise HTTPException(status_code=404, detail="Drop not found")
        return {"id": drop_doc.id, **drop_doc.to_dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

