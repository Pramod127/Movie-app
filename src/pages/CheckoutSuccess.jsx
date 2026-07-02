import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const CheckoutSuccess = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const sessionId = params.get('session_id')
    // You could fetch session details and show a receipt here
    // For now, show a basic message and link to bookings
  }, [])
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Payment successful</h1>
      <p className="text-gray-500 mb-6">Thank you! Your booking has been confirmed.</p>
      <button onClick={() => navigate('/my-bookings')} className="px-6 py-2 bg-red-600 text-white rounded">Go to My Bookings</button>
    </div>
  )
}

export default CheckoutSuccess
