"use client";

import React, { useState } from "react";
import { ChatMessage } from "./_components/ChatMessage";
import { ReservationPanel } from "./_components/ReservationPanel";
import { UserMessage } from "./_components/UserMessage";
import { ChatInput } from "./_components/ChatInput";
import type { FetchChatResponse, ChatContent, Reservation } from "./types/chat";
import { HotelCard } from "./_components/HotelCard";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ChatContent[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [thread, setThread] = useState<string>("");

  const handleSendMessage = (message: string) => {
    setChatHistory((prev) => [
      ...prev,
      { component_type: "user", content: message },
    ]);
    sendMessageToChat(message);
  };

  const sendMessageToChat = async (message: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          thread_id: thread != "" ? thread : null,
          id_viajero: "1234567890",
        }),
      });

      const data: FetchChatResponse = await response.json();
      console.log(data);
      setThread(data.response.thread_id);
      setChatHistory((prev) => [...prev, ...data.response.value.content]);
      setReservations(data.response.value.reservasEnProceso);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-2rem)]">
          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-sm flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {chatHistory.map((content, index) => (
                <div key={index}>
                  {content.component_type === "message" && content.content && (
                    <ChatMessage content={content.content} />
                  )}
                  {content.component_type === "hotel" && content.id_hotel && (
                    <HotelCard id_hotel={content.id_hotel} />
                  )}
                  {content.component_type === "user" && content.content && (
                    <UserMessage message={content.content} />
                  )}
                </div>
              ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>

          {/* Reservations Section */}
          <div className="overflow-y-auto">
            <ReservationPanel reservations={reservations} />
          </div>
        </div>
      </div>
    </div>
  );
}
