import React from 'react';
import Navbar from './component/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';

import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBooking from './pages/MyBooking';
import Favorite from './pages/Favorite';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import { Toaster } from 'react-hot-toast';
import Footer from './component/Footer';
import HomeTemp from './pages/HomeTemp';

import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import Layout from './pages/admin/Layout';
import Deshboard from './pages/admin/Deshboard';


const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  // Example colors for the app wrapper
  const appWrapperStyle = {
    backgroundColor: '#121212', // dark background
    color: '#e0e0e0',           // light text color
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
  };

  return (
    <div style={appWrapperStyle}>
      <Toaster />
      {!isAdminRoute && (
        <div style={{ backgroundColor: '#1f2937', padding: '10px 20px' }}>
          <Navbar />
        </div>
      )}

      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<HomeTemp />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
       
          <Route path="/movie/:id/:date" element={<SeatLayout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path='/admin/*' element={<Layout/>}>
          <Route index element={<Deshboard/>}/>
      
               
                    <Route path ="list-booling" element={<ListBookings/>}/>

</Route>


        </Routes>
      </main>

      {!isAdminRoute && (
        <footer style={{ backgroundColor: '#1f2937', padding: '15px 20px', marginTop: 'auto' }}>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default App;
