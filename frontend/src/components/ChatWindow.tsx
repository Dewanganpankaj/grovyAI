"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/type/chat";
import { sendMessage } from "@/services/chatService";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendMessage({ messages: history });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="header-icon">🤖</div>
        <div className="header-text">
          <h1>AI Assistant</h1>
          <p>powered by openai</p>
        </div>
        <div className="status-dot" />
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h2>Start a conversation</h2>
            <p>Ask me anything — I&apos;m here to help</p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="error-banner">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Input */}
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send)"
            rows={1}
            disabled={isLoading}
          />
          <div className="input-hint">Shift+Enter for new line</div>
        </div>
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
