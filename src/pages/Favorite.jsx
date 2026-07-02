import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../component/MovieCard";
import BlurCircle from "../component/BlurCircle"; // <-- import here

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative p-6 overflow-hidden">
      {/* Blurred Background Decorations */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-lg font-medium my-4">Your Favorite Movies</h1>

      {/* Flexbox Row */}
   <div className="flex flex-wrap justify-center gap-8 mt-4 pb-3">
  {dummyShowsData.map((movie) => (
    <MovieCard movie={movie} key={movie.id} />
  ))}
</div>

    </div>
  ) : (
    <div className="p-6 text-gray-500">No Movies Found</div>
  );
};

export default Favorite;
