import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import api from '../lib/api'
import { PlayCircleIcon, StarsIcon, Heart } from "lucide-react";
import BlurCircle from "../component/BlurCircle";
import DateSelect from "../component/DateSelect";
import MovieCard from "../component/MovieCard";
import Loading from "../component/Loading";

// Helper to format runtime safely
const timeFormat = (mins) => {
  if (!mins) return "N/A";
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getShow = () => {
    setLoading(true)
    setError(null)
    api.fetchMovie(id)
      .then(m => {
        setShow({ movie: {
          _id: m._id,
          title: m.title,
          overview: m.description || '',
          poster_path: m.posterUrl || m.poster_path || '',
          vote_average: m.rating || 0,
          runtime: m.duration || m.runtime || 0,
          genres: (m.genre || []).map(g => (typeof g === 'string' ? { name: g } : g)),
          release_date: m.releaseDate || m.release_date || new Date().toISOString(),
          casts: m.casts || [],
        }, dateTime: dummyDateTimeData })
      })
      .catch(() => setError('Movie not found!'))
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    getShow();
  }, [id]);

  // Show loading spinner
  if (loading) return <Loading />;

  // If wrong ID entered → show error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-400">
        <h1 className="text-2xl font-semibold mb-4">{error}</h1>
        <button
          onClick={() => navigate("/movies")}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  // ✅ Main Movie Details
  return (
    <div className="px-6 md:px-16 lg:px-40 pt-28 md:pt-40">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Poster */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        {/* Details */}
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-gray-300">
            <StarsIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          {/* Overview */}
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          {/* Runtime, Genre, Year */}
          <p className="text-sm text-gray-300 mt-2">
            {timeFormat(show.movie.runtime)} ·{" "}
            {show.movie.genres?.map((g) => g.name).join(", ") || "Unknown"} ·{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            {/* Watch Trailer */}
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            {/* Buy Tickets */}
            <a
              href="#dateselect"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Buy Tickets
            </a>

            {/* Favorite */}
            <button className="p-2 rounded-full border border-gray-500 hover:bg-gray-700 transition">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts?.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={cast.profile_path}
                alt={cast.name}
                loading="lazy"
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Select */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* Recommended Movies */}
      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-red-600 hover:bg-red-700 transition rounded-md font-medium cursor-pointer text-white"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;


