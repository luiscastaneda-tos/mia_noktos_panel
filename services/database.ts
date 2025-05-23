import { Hotel } from "@/app/types/hotel";

export const fetchHotelById = async (
  id: string,
  callback: (data: Hotel) => void
) => {
  try {
    const data = await fetch(`http://localhost:3001/hotel?id=${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    callback(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
