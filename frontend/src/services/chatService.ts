import { ChatRequest, ChatResponse } from "@/type/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Something went wrong");
  }

  return response.json();
}
