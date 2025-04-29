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
interface CardHotel {
  component_type: "hotel";
  id_hotel: string;
}

interface UserMessage {
  component_type: "user";
  content: string;
}

export type ChatContent = MessageContent | CardHotel | UserMessage;

export interface Reservation {
  check_in: string;
  check_out: string;
  id_hotel: string;
  id_viajero: string;
  id_empresa: string | null;
}

export interface ChatResponse {
  content: (MessageContent | CardHotel)[];
  reservasEnProceso: Reservation[];
}
export interface FetchChatResponse {
  ok: boolean;
  response: {
    thread_id: string;
    value: {
      content: (MessageContent | CardHotel)[];
      reservasEnProceso: Reservation[];
    };
  };
}
