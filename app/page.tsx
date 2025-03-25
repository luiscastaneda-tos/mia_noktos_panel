"use client";

import React, { useState } from "react";
import { ChatMessage } from "./_components/ChatMessage";
import { ImageSlider } from "./_components/ImageSlider";
import { ReservationPanel } from "./_components/ReservationPanel";
import { ChatInput } from "./_components/ChatInput";
import type { ChatResponse, ChatContent, Reservation } from "./types/chat";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ChatContent[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data: ChatResponse = await response.json();
      setChatHistory((prev) => [...prev, ...data.content]);
      setReservations(data.reservasEnProceso);
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
                  {content.component_type === "slider" && content.images && (
                    <ImageSlider images={content.images} />
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
