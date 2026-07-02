import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { dummyShowsData } from '../assets/assets'; 
import { useEffect, useState } from 'react'
import api from '../lib/api'

const mapServerMovieToUI = (m) => ({
  _id: m._id,
  id: m._id,
  title: m.title,
  overview: m.description || m.overview || '',
  backdrop_path: m.posterUrl || m.backdrop_path || m.poster_path || '',
  release_date: m.releaseDate || m.release_date || new Date().toISOString(),
  genres: (m.genre || m.genres || []).map(g => (typeof g === 'string' ? { name: g } : g)),
  runtime: m.duration || m.runtime || 0,
  vote_average: m.rating || m.vote_average || 0,
})

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(dummyShowsData.slice(0,6))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.fetchMovies()
      .then(list => {
        if (!mounted) return
        setMovies(list.map(mapServerMovieToUI))
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => {
            navigate('/movies');
            window.scrollTo(0, 0);
          }}
          className="group flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </button>
      </div>

   
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          movies.map((show) => <MovieCard key={show._id} movie={show} />)
        )}
      </div>

  <div className="flex justify-center mt-20">
  <button
    onClick={() => {
      navigate('/movies');
      window.scrollTo(0, 0);
    }}
    className="px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-md font-medium cursor-pointer text-white"
  >
    Show More
  </button>
</div>

    </div>
  );
};

export default FeaturedSection;

