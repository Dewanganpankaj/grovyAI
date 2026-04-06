import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=dotenv_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "llama3-8b-8192")
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "1000"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))