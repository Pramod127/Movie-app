import React from "react";
import MovieCard from "../component/MovieCard";
import { useEffect, useState } from 'react'
import api from '../lib/api'
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../component/BlurCircle"; // <-- import here

const Movies = () => {
  const [movies, setMovies] = useState(dummyShowsData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.fetchMovies()
      .then(list => { if (!mounted) return; setMovies(list.map(m => ({
        _id: m._id,
        id: m._id,
        title: m.title,
        backdrop_path: m.posterUrl || m.backdrop_path || m.poster_path || '',
        release_date: m.releaseDate || m.release_date,
        genres: (m.genre || m.genres || []).map(g => (typeof g === 'string' ? { name: g } : g)),
        runtime: m.duration || m.runtime || 0,
        vote_average: m.rating || m.vote_average || 0,
      })))} )
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return movies.length > 0 ? (
    <div className="relative p-6 overflow-hidden">
      {/* Blurred Background Decorations */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-lg font-medium my-4">Your Favorite Movies</h1>

      {/* Flexbox Row */}
     <div className="flex flex-wrap justify-center gap-8 mt-4 pb-3">
  {loading ? <p className="text-gray-400">Loading movies...</p> : movies.map((movie) => (
    <MovieCard movie={movie} key={movie._id} />
  ))}
</div>

    </div>
  ) : (
    <div className="p-6 text-gray-500">No Movies Found</div>
  );
};

export default Movies;
