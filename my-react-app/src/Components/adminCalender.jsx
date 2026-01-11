import { useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import { DateTime } from 'luxon'

const AdminCalender = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state?.service;

    const [currentDate, setcurrentDate] = useState(DateTime.now());

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.startOf('week')
    const endDay = endOfMonth.endOf('week');

    const calendarDays = [];
    let day = startDay;
    while (day <= endDay) {
        calendarDays.push(day);
        day = day.plus({ days: 1 });
    };

    const handleDateClick = (selectedDate) => {
        navigate(`/manage-availability/${service.id}`, {
            state: {
                service: service,
                selectedDate: selectedDate.toISODate()

            }
        });
    };

    const goToPreviousMonth = () => {
        setcurrentDate(currentDate.minus({ months: 1 }))
    };

    const goToNextMonth = () => {
        setcurrentDate(currentDate.plus({ months: 1 }))
    };

    const isCurrentMonth = (date) => {
        return date.month === currentDate.month;
    };

    const isToday = (date) => {
        const today = DateTime.now();
        return date.hasSame(today, 'day');
    };

    const isPast = (date) => {
        const today = DateTime.now().startOf('day');
        return date < today;
    };

    return (
        <div>
            <div className="calendar-header">
                <div className="calendar-header-content">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <span> › </span>
                        <span>
                            {service?.name}
                        </span>
                    </div>
                   
                </div>
            </div>

            <div className="calendar-container">
                <div className="calendar-card">
                    <div className="calendar-nav">
                        <button 
                            className="btn-nav"
                            onClick={goToPreviousMonth}
                        >
                            ← Previous
                        </button>
                        <h2 className="current-month">
                            {currentDate.toFormat('MMMM yyyy')}
                        </h2>
                        <button 
                            className="btn-nav"
                            onClick={goToNextMonth}
                        >
                            Next →
                        </button>
                    </div>
                    <div className="calendar-grid">
                        <div className="day-header">Mon</div>
                        <div className="day-header">Tue</div>
                        <div className="day-header">Wed</div>
                        <div className="day-header">Thu</div>
                        <div className="day-header">Fri</div>
                        <div className="day-header">Sat</div>
                        <div className="day-header">Sun</div>

                        {calendarDays.map((day, index) => (
                            <div
                                key={index}
                                className={`calendar-day 
                                    ${!isCurrentMonth(day) ? 'other-month' : ''}
                                    ${isToday(day) ? 'today' : ''}
                                    ${isPast(day) ? 'past' : 'clickable'}
                                `}
                                onClick={() => !isPast(day) && handleDateClick(day)}
                            >
                                <span className="day-number">{day.day}</span>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
    
};

export default AdminCalender;