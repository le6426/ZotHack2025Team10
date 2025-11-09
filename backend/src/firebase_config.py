import firebase_admin
from firebase_admin import credentials, firestore, auth
from pathlib import Path

import os

cred_path = os.getenv("FIREBASE_CREDENTIALS") or Path(__file__).parent / "serviceAccountKey.json"

if not cred_path.exists():
    raise FileNotFoundError(f"Firebase credentials not found at {cred_path}")

if not firebase_admin._apps:
    cred = credentials.Certificate(str(cred_path))
    firebase_admin.initialize_app(cred)

db = firestore.client()
auth_client = auth
