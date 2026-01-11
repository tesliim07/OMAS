import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './Components/landingPage'
import Home from './Components/home'
import Services from './Components/services'
import CalendarView from './Components/calendarView'
import TimeSlot from './Components/timeSlot'
<<<<<<< HEAD
import AdminLogin from './Components/adminLogin'
import AdminDashboard from './Components/adminDashboard'
=======
import Booking from './Components/booking'
import BookingConfirm from './Components/bookingConfirm'

>>>>>>> origin/feature/Patient

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Landing />} />
=======
        <Route path="/" element={<Home />} />
>>>>>>> origin/feature/Patient
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/calendarView" element={<CalendarView />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/timeSlot" element={<TimeSlot/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/bookingConfirm" element={<BookingConfirm/>} />
      </Routes>
    </Router>
  );
}

export default App
