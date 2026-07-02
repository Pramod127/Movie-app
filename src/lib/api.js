const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

import { dummyShowsData, dummyBookingData } from '../assets/assets'

async function safeFetch(url, options) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error('Network response not ok')
    return await res.json()
  } catch (e) {
    // Rethrow so callers can decide, or return undefined
    throw e
  }
}

export async function fetchMovies() {
  try {
    return await safeFetch(`${API_URL}/movies`)
  } catch (e) {
    // fallback to local dummy data when server is not available
    return dummyShowsData
  }
}

export async function fetchMovie(id) {
  try {
    return await safeFetch(`${API_URL}/movies/${id}`)
  } catch (e) {
    return dummyShowsData.find(m => String(m._id) === String(id) || String(m.id) === String(id))
  }
}

export async function fetchShow(id) {
  try {
    return await safeFetch(`${API_URL}/shows/${id}`)
  } catch (e) {
    // build a mocked show object from dummy data
    // seats: rows A-J, 9 cols
    const seats = []
    const rows = ['A','B','C','D','E','F','G','H','I','J']
    rows.forEach(row => {
      for (let i=1;i<=9;i++) seats.push({ seatNumber: `${row}${i}`, available: Math.random() > 0.2 })
    })
    return { _id: id, seats, price: 100 }
  }
}

export async function fetchBookings() {
  try {
    return await safeFetch(`${API_URL}/bookings`)
  } catch (e) {
    return dummyBookingData
  }
}

export async function createCheckoutSession(payload) {
  try {
    const res = await fetch(`${API_URL}/payments/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to create session')
    return await res.json()
  } catch (e) {
    // fallback mock response when server is missing
    return { mock: true, successUrl: '/checkout/success?mock=true', cancelUrl: '/checkout/cancel?mock=true' }
  }
}

export default {
  fetchMovies,
  fetchMovie,
  fetchShow,
  fetchBookings,
  createCheckoutSession,
}
