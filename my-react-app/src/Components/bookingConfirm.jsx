import React from 'react'
import { useState } from 'react'
import NavBar from './navbar'
import { useNavigate, useLocation } from 'react-router-dom';

const bookingConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { formData, selectedDate, time, title } = location.state;
    const {fullname, email, description} = formData;

    return (
        <div>
            {/* Needs styling */}
            <NavBar />
            <h2>Booking Confirmed!</h2>
            <div class="confirmation-container">
                <div>
                    <p>Service: {title}</p>
                </div>
                <div>
                    <p>Date: {selectedDate}</p>
                </div>
                <div>
                    <p>Time: {time}</p>
                </div>
                <div>
                    <p>Patient Name: {fullname}</p>
                </div>
                <div>
                    <p>Email: {email}</p>
                </div>
                <div>
                    <p>Description: {description}</p>
                </div>
                <div>
                    <p>A confirmation email with all the details has been sent to your email.</p>
                </div>
            </div>
        </div>
    )
}

export default bookingConfirm
