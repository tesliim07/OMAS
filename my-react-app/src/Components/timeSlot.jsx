import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './navbar'
import { DateTime } from 'luxon'

const timeSlot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const today = DateTime.local();
    const bookedSlots = ["10:00 AM", "1:30 PM"]; // Placeholder booked times. To be replaced with API

    const { duration } = location.state || {};


    // Provide a default duration if none is passed
    const effectiveDuration = duration || 30; // Default to 30 minutes

    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(
        today.startOf("month")
    );

    const goToPreviousDay = () => {
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({ day: 1 }))
    };

    const goToNextDay = () => {
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({ day: 1 }))
    };

    const timeSlots = [];
    if (effectiveDuration) {
        const startTime = DateTime.local().set({ hour: 9, minute: 0 });
        const endTime = DateTime.local().set({ hour: 17, minute: 0 });
        let currentTime = startTime;

        while (currentTime < endTime) {
            timeSlots.push(currentTime.toFormat("h:mm a"));
            currentTime = currentTime.plus({ minutes: parseInt(effectiveDuration) });
        }
    }
    


    const [selectedSlot, setSelectedSlot] = useState(null);

    return (
        <div>
            <NavBar />
            <h2>Time Slot Selection - Daily View</h2>
            <p className="slot-text">Select a Time Slot for Selected Date</p>
            <div className="slot-container">
                <div className="slot">
                    <div className="slot-headline">
                        <div className="slot-headline-controls">
                            <div className="slot-headline-control-previous" onClick={() => goToPreviousDay()}>
                                <p>Previous</p>
                            </div>
                            <div className="slot-headline-day">
                                {firstDayOfActiveMonth.day} {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
                            </div>
                            <div className="slot-headline-control-next" onClick={() => goToNextDay()}>
                                <p>Next</p>
                            </div>
                        </div>
                    </div>
                    <div className="slot-time-grid">
                        {timeSlots.map((time, index) => {
                            const isBooked = bookedSlots.includes(time);
                            let slotClass = "slot-time-item";
                            if (isBooked) slotClass += " booked";
                            if (selectedSlot === time) slotClass += " selected";
                            return (
                                <div
                                    key={index}
                                    className={slotClass}
                                    onClick={() => {
                                        if (!isBooked) {
                                            setSelectedSlot(time);
                                        }
                                    }}
                                >
                                    {time}
                                </div>
                            )
                        })}
                    </div>
                    <div className="go-booking-btn">
                        <button
                            disabled={!selectedSlot}
                            onClick={() => {
                                if (selectedSlot) {
                                    navigate("/booking", { state: { time: selectedSlot } });
                                }
                            }}
                        >
                            Go to Booking Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default timeSlot
