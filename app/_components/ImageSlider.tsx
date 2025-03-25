import React, { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        loader={({ src }) => src} // Custom loader to allow all domains
      />

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={previousImage}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          ←
        </button>
        <button
          onClick={nextImage}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          →
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
