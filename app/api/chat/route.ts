import { NextResponse } from "next/server";
import type { ChatResponse } from "@/app/types/chat";

export async function POST(request: Request) {
  const { content, thread_id, id_viajero } = await request.json();

  try {
  } catch (error) {}

  // Here you would normally make a call to your backend
  // For now, we'll just return a mock response
  const mockResponse: ChatResponse = {
    content: [
      {
        component_type: "message",
        content:
          "Perfecto, entonces haremos la reserva en el Val Paraíso comenzando el 21 de octubre de 2025 y te quedarás hasta el 26 de octubre de 2025.\n\nAquí tienes algunas fotos del hotel Val Paraíso para que te hagas una idea de cómo es: 📸",
      },
      {
        component_type: "slider",
        images: [
          "https://images.trvl-media.com/lodging/1000000/50000/40900/40864/b8dc3b96.jpg",
          "https://images.trvl-media.com/lodging/1000000/50000/40900/40864/b8dc3b96.jpg",
          "https://images.trvl-media.com/lodging/1000000/50000/40900/40864/b8dc3b96.jpg",
        ],
      },
    ],
    reservasEnProceso: [
      {
        check_in: "2025-10-15",
        check_out: "2025-10-20",
        id_hotel: "city_express",
        id_viajero: "124332",
        id_empresa: "null",
      },
      {
        check_in: "2025-10-21",
        check_out: "2025-10-26",
        id_hotel: "val_paraiso",
        id_viajero: "124332",
        id_empresa: "null",
      },
    ],
  };

  return NextResponse.json(mockResponse);
}
