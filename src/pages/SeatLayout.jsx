import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import api from '../lib/api'
import Loading from '../component/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../component/BlurCircle';
import { toast } from 'react-hot-toast';

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [currentShowInfo, setCurrentShowInfo] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const showData = dummyShowsData.find((s) => s._id === id);
    if (showData) {
      setShow({
        movie: showData,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  // fetch occupied seats when a time (showId) selected
  useEffect(() => {
    if (!selectedTime) return
    const showId = selectedTime.showId
    // try to fetch show details from backend to get seat availability & price (falls back to mock)
    api.fetchShow(showId)
      .then(s => {
        setCurrentShowInfo(s)
        const occ = (s.seats || []).filter(se => se.available === false).map(se => se.seatNumber)
        setOccupiedSeats(occ)
      })
      .catch(async () => {
        // fallback: gather occupied seats from bookings endpoint (mocked if server missing)
        try {
          const list = await api.fetchBookings()
          const occ = []
          list.forEach(b => {
            if (b.show && String(b.show._id) === String(showId) && Array.isArray(b.seats)) {
              occ.push(...b.seats)
            }
          })
          setOccupiedSeats(occ)
        } catch (e) {
          setOccupiedSeats([])
        }
      })
  }, [selectedTime])

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first");
    if (occupiedSeats.includes(seatId)) return toast('Seat already booked')
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast("You can only select 5 seats");

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          const isSelected = selectedSeats.includes(seatId)
          const isBooked = occupiedSeats.includes(seatId)

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={isBooked}
              className={`h-9 w-9 rounded-md flex items-center justify-center text-xs font-medium transition-colors select-none
                ${isBooked ? 'bg-gray-700 text-gray-400 cursor-not-allowed line-through' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  );

  if (!show) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-12 gap-6 pb-40">
      {/* Left Panel - Available Timings */}
      <div className="w-full md:w-60 bg-red-100 border border-red-200 rounded-lg py-10 h-max md:sticky md:top-32 mt-8 md:mt-0">
        <p className="text-lg font-semibold px-6 mb-6">Available Timings</p>
        <div className="flex flex-col gap-3">
          {show.dateTime[date]?.length ? (
            show.dateTime[date].map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer transition
                  ${selectedTime?.time === item.time ? 'bg-blue-500 text-black shadow-md' : 'hover:bg-blue-200'}`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="px-6 text-gray-500">No showtimes available</p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative flex-1 flex flex-col items-center mt-8 md:mt-0">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-gray-300">
          {/* Legend */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2"><span className="h-4 w-6 bg-gray-200 inline-block rounded"/> <span className="text-sm">Available</span></div>
            <div className="flex items-center gap-2"><span className="h-4 w-6 bg-red-500 inline-block rounded"/> <span className="text-sm">Selected</span></div>
            <div className="flex items-center gap-2"><span className="h-4 w-6 bg-gray-700 inline-block rounded"/> <span className="text-sm">Booked</span></div>
          </div>

          {/* Selected info & price */}
          <div className="flex items-center gap-6 mb-6">
            <p className="text-sm">Selected: <strong>{selectedSeats.join(', ') || '—'}</strong></p>
            <p className="text-sm">Price: <strong>{selectedSeats.length * (currentShowInfo?.price || 100)}</strong></p>
          </div>

          {groupRows.map((group, idx) => (
            <div key={idx} className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
              {group.map((row) => renderSeats(row))}
            </div>
          ))}
        </div>
      </div>
    <button
        onClick={async () => {
          if (!selectedTime) return toast('Please select a showtime')
          if (selectedSeats.length === 0) return toast('Please select at least one seat')
          // simple prompt for name/email for demo (replace with auth in future)
          const name = prompt('Enter your name for booking')
          const email = prompt('Enter your email for ticket receipt')
          if (!name || !email) return toast('Name and email required')
            toast.loading('Creating checkout session...')
            try {
              const payload = { showId: selectedTime.showId, seats: selectedSeats, totalPrice: selectedSeats.length * (currentShowInfo?.price || 100), name, email }
              const data = await api.createCheckoutSession(payload)
              if (data?.url) {
                // real Stripe checkout URL
                window.location.href = data.url
              } else if (data?.mock) {
                toast.dismiss()
                toast.success('Mock checkout complete — booking saved locally')
                // navigate to the success page (mock)
                navigate(data.successUrl)
              } else if (data?.successUrl) {
                window.location.href = data.successUrl
              } else {
                toast.error('Failed to create checkout session')
              }
            } catch (e) {
              console.error(e)
              toast.error('Payment error')
            }
        }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-96 flex items-center justify-center gap-2 px-6 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-full font-medium cursor-pointer active:scale-95 shadow-lg z-50"
      >
        Proceed to checkout
        <ArrowRightIcon strokeWidth={3} className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SeatLayout;


