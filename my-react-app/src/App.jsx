import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/home'
import Services from './Components/services'
import CalendarView from './Components/calendarView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/calendarView" element={<CalendarView />} />
      </Routes>
    </Router>
  );
}

export default App
