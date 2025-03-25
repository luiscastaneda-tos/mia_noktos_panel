import React from "react";
import { format } from "date-fns";
import type { Reservation } from "../types/chat";

interface ReservationPanelProps {
  reservations: Reservation[];
}

export const ReservationPanel: React.FC<ReservationPanelProps> = ({
  reservations,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Reservaciones en Proceso</h2>
      <div className="space-y-4">
        {reservations.map((reservation, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <h3 className="font-medium text-lg mb-2">
              Hotel ID: {reservation.id_hotel}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Check-in:{" "}
                {format(new Date(reservation.check_in), "dd MMM yyyy")}
              </p>
              <p>
                Check-out:{" "}
                {format(new Date(reservation.check_out), "dd MMM yyyy")}
              </p>
              <p>Viajero ID: {reservation.id_viajero}</p>
              {reservation.id_empresa && (
                <p>Empresa ID: {reservation.id_empresa}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
