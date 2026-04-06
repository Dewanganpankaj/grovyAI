from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME, MAX_TOKENS, TEMPERATURE

client = Groq(api_key=GROQ_API_KEY)

def get_chat_response(messages: list) -> str:
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
    )
    return response.choices[0].message.content or "Sorry, I couldn't generate a response."