import React, { useState, useCallback, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

// Define el tipo de las referencias que usas (input y autocomplete)
declare global {
  interface Window {
    google: typeof google;
  }
}

const AddressAutocomplete: React.FC = () => {
  const [address, setAddress] = useState<string>(""); // Dirección seleccionada

  // Referencia al input del autocompletado
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Maneja el cambio de texto en el campo de entrada
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(event.target.value);
  };

  // Maneja cuando el usuario selecciona una sugerencia del autocompletado
  const handleSelect = useCallback((): void => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        // Si el lugar tiene geometría, puedes obtener la latitud y longitud
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        console.log("Latitud:", lat, "Longitud:", lng);
      }
      setAddress(place.formatted_address || ""); // Establece la dirección completa seleccionada
    }
  }, []);

  return (
    <div>
      <h1>Autocompletado de Dirección</h1>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}>
        {/* Autocomplete component without map */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} // Asigna la referencia del Autocomplete
          onPlaceChanged={handleSelect} // Cuando el usuario selecciona una sugerencia
        >
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={handleChange} // Actualiza el estado mientras el usuario escribe
            placeholder="Escribe una dirección"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export default AddressAutocomplete;
