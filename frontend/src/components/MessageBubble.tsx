import { Message } from "@/type/chat";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      <div className={`avatar ${isUser ? "user" : "bot"}`}>
        {isUser ? "👤" : "🤖"}
      </div>
      <div className="message-content">
        <div className={`bubble ${isUser ? "user" : "bot"}`}>
          {message.content}
        </div>
        <span className="timestamp">{time}</span>
      </div>
    </div>
  );
}
