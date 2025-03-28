import { NextResponse } from "next/server";
import type { FetchChatResponse } from "@/app/types/chat";

export async function POST(request: Request) {
  const { content, thread_id, id_viajero } = await request.json();

  try {
    const res = await fetch(`http://localhost:3001/chat`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ content, thread_id, id_viajero }),
    });

    const response: FetchChatResponse = await res.json();
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: true, details: error });
  }
}
