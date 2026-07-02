import React from 'react'
import { useNavigate } from 'react-router-dom'

const CheckoutCancel = () => {
  const navigate = useNavigate()
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Payment cancelled</h1>
      <p className="text-gray-500 mb-6">Your payment was cancelled. You can try again or modify your booking.</p>
      <button onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-600 text-white rounded">Go back</button>
    </div>
  )
}

export default CheckoutCancel
