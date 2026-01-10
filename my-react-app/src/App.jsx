import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/home'
import Services from './Components/services'
import CalendarView from './Components/calendarView'
import TimeSlot from './Components/timeSlot'
import Booking from './Components/booking'
import BookingConfirm from './Components/bookingConfirm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/calendarView" element={<CalendarView />} />
        <Route path="/timeSlot" element={<TimeSlot/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/bookingConfirm" element={<BookingConfirm/>} />
      </Routes>
    </Router>
  );
}

export default App
