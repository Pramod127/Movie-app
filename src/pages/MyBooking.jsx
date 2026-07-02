
import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'

import BlurCircle from '../component/BlurCircle'
import Loading from "../component/Loading";

const MyBooking = () => {
  const currencySymbol = import.meta.env.VITE_CURRENCY || "₹"  // fallback
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try {
      // simulate fetch delay
      await new Promise(res => setTimeout(res, 800))
      setBookings(dummyBookingData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-32 md:pt-40 min-h-[80vh] text-white">
      <BlurCircle top="100" left="100px" />
      <BlurCircle top="0" left="600px" />

      <h1 className="text-2xl font-bold mb-6">🎟️ My Bookings</h1>

      {bookings.length > 0 ? (
        <ul className="space-y-5">
          {bookings.map((b, index) => (
            <li
              key={index}
              className={`p-5 rounded-xl shadow-lg border transition 
                ${b.isPaid 
                  ? "bg-green-500/20 border-green-400 hover:bg-green-500/30" 
                  : "bg-red-500/20 border-red-400 hover:bg-red-500/30"}`}
            >
              {/* Movie Title */}
              <h2 className="font-extrabold text-lg text-yellow-300 mb-1">
                {b.show.movie.title}
              </h2>

              {/* Seats + Amount */}
              <p className="mb-1">
                Seats:{" "}
                <span className="text-indigo-300 font-medium">
                  {b.bookedSeats.join(", ")}
                </span>{" "}
                | Amount:{" "}
                <span className="text-yellow-400 font-semibold">
                  {currencySymbol}{b.amount}
                </span>
              </p>

              {/* Status Badge */}
              <p className="mb-1">
                Status:{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold shadow 
                    ${b.isPaid ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                >
                  {b.isPaid ? "Paid" : "Unpaid"}
                </span>
              </p>

              {/* Show time */}
              <small className="text-gray-300">
                Show Time:{" "}
                <span className="text-yellow-500">
                  {new Date(b.show.showDateTime).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No bookings found.</p>
      )}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBooking
