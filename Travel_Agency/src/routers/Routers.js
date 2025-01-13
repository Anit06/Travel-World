import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from '../pages/Home';
import About from '../pages/About';
import Travel from '../pages/Travel';
import BookingTour from '../pages/BookingTour';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import AllProducts from '../admin/AllProducts';
import AddProducts from '../admin/AddProducts';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import BookingList from '../admin/BookingList';

const Routers = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn state based on user login status
      if (user) {
        localStorage.setItem('loginTime', new Date().getTime()); // Store login time in localStorage
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const loginTime = localStorage.getItem('loginTime');
      const thirtySeconds = 60 * 1000; // 30 seconds in milliseconds
      const shouldRedirect = loginTime && new Date().getTime() - parseInt(loginTime, 10) > thirtySeconds;

      if (shouldRedirect) {
        // Redirect to login page after 30 seconds if the user is not logged in
        const redirectTimer = setTimeout(() => {
          window.location.href = '/login';
        }, thirtySeconds);

        // Cleanup function to clear the timer when the component unmounts or the user logs in
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="travel" element={<Travel />} />
      <Route path="bookingTour" element={<BookingTour />} />
      <Route path="cart" element={<Cart />} />
      <Route path="travel/:id" element={<ProductDetails />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/add-products" element={<AddProducts />} />
        <Route path="dashboard/booking-list" element={<BookingList />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
