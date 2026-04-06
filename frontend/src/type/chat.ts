export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  messages: { role: Role; content: string }[];
}

export interface ChatResponse {
  reply: string;
  status: string;
}
