import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <p className="text-gray-300 font-medium text-lg text-center mb-6">
        🎬 Trailers
      </p>

      {/* Video Player */}
      <div className="flex justify-center">
        <iframe
          width="960"
          height="540"
          src={currentTrailer.videoUrl}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl shadow-lg"
        ></iframe>
      </div>

      {/* Thumbnail List */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        {dummyTrailers.map((trailer, index) => (
          <img
            key={index}
            src={trailer.image}
            alt={`Trailer ${index + 1}`}
            onClick={() => setCurrentTrailer(trailer)}
            className={`w-40 h-24 object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
              currentTrailer.videoUrl === trailer.videoUrl
                ? "ring-4 ring-red-500 scale-105"
                : "hover:scale-105"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;

