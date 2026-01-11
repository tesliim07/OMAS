import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './Components/landingPage'
import Home from './Components/home'
import Services from './Components/services'
import CalendarView from './Components/calendarView'
import TimeSlot from './Components/timeSlot'
import AdminLogin from './Components/adminLogin'
import AdminDashboard from './Components/adminDashboard'
import AdminCalender from './Components/adminCalender'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/calendarView" element={<CalendarView />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/calendar-admin/:serviceId" element={<AdminCalender />} />
        <Route path="/timeSlot" element={<TimeSlot/>} />
      </Routes>
    </Router>
  );
}

export default App
