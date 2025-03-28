// export interface ChatResponse {
//   content: ChatContent[];
//   reservasEnProceso: Reservation[];
// }

// export interface ChatContent {
//   component_type: "message" | "slider";
//   content?: string;
//   images?: string[];
// }

interface MessageContent {
  component_type: "message";
  content: string;
}
interface SliderImage {
  component_type: "slider";
  images: string[];
}
export type ChatContent = MessageContent | SliderImage;

export interface Reservation {
  check_in: string;
  check_out: string;
  id_hotel: string;
  id_viajero: string;
  id_empresa: string | null;
}

export interface ChatResponse {
  content: (MessageContent | SliderImage)[];
  reservasEnProceso: Reservation[];
}
export interface FetchChatResponse {
  ok: boolean;
  response: {
    thread_id: string;
    value: {
      content: (MessageContent | SliderImage)[];
      reservasEnProceso: Reservation[];
    };
  };
}
