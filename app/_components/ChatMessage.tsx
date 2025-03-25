import React from "react";

interface ChatMessageProps {
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content }) => {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm mb-4 prose max-w-none">
      <p className="whitespace-pre-wrap text-gray-800">{content}</p>
    </div>
  );
};
