import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './Components/landingPage'
import Services from './Components/services'
import CalendarView from './Components/calendarView'
import TimeSlot from './Components/timeSlot'
import AdminLogin from './Components/adminLogin'
import AdminDashboard from './Components/adminDashboard'
import Booking from './Components/booking'
import BookingConfirm from './Components/bookingConfirm'
import Error from './Components/error'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/calendarView/:serviceName" element={<CalendarView />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/timeSlot/:serviceName/:selectedDate" element={<TimeSlot/>} />
        <Route path="/booking/:serviceName/:timeSlotId" element={<Booking/>} />
        <Route path="/bookingConfirm/:appointmentId/:serviceName" element={<BookingConfirm/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App
