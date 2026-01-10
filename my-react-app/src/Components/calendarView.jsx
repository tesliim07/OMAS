import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './navbar'
import { Info, DateTime, Interval } from 'luxon'


const CalendarView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = DateTime.local();

  // Get service data from location.state
  const { duration } = location.state || {};
  const {title} = location.state;

  const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(
    today.startOf("month")
  );

  const weekDays = Info.weekdays("short");

  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  )
    .splitBy({ day: 1 })
    .map((day) => day.start);

  const goToPreviousMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({ month: 1 }))
  };

  const goToNextMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({ month: 1 }))
  };


  const handleDateClick = (date) => {
    // receives service data, including the duration, and passes the duration along with the selected date when navigating to timeSlot
    navigate('/timeSlot', { state: { selectedDate: date.toISODate(), duration, title } });
  };

  const renderDayCell = (day) => {
    const isToday = day.hasSame(today, 'day');
    const isCurrentMonth = day.hasSame(firstDayOfActiveMonth, 'month');

    return (
      <div
        class={`calendar-grid-cell ${isToday ? 'today' : ''} ${isCurrentMonth ? '' : 'not-current-month'}`}
        style={{
          cursor: isCurrentMonth ? 'pointer' : 'default',
          color: isCurrentMonth ? 'inherit' : 'gray',
        }}
      >
        {day.day}
      </div>
    );
  };


  return (
    <div>
      <NavBar />

      <h2>Monthly Calendar View - Available Booking Slots</h2>
      <p class="booking-text">Select a date for your appointment</p>
      <div class="calendar-container">
        <div class="calendar">
          <div class="calendar-headline">
            <div class="calendar-headline-controls">
              <div class="calendar-headline-control-previous" onClick={() => goToPreviousMonth()}>
                <p>Previous</p>
              </div>
              <div class="calendar-headline-month">
                {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
              </div>
              <div class="calendar-headline-control-next" onClick={() => goToNextMonth()}>
                <p>Next</p>
              </div>
            </div>
          </div>
          <div class="calendar-weeks-grid">
            {weekDays.map((weekDay, weekDayIndex) => (
              <div key={weekDayIndex} class="calendar-weeks-grid-cell">
                {weekDay}
              </div>
            ))}
          </div>
          <div class="calendar-grid">
            {daysOfMonth.map((day, dayIndex) => {
              const isCurrentMonth = day.hasSame(firstDayOfActiveMonth, 'month');
              return (
                <div
                  key={dayIndex}
                  className="calendar-grid-cell"
                  onClick={isCurrentMonth ? () => handleDateClick(day) : null}
                  style={{ cursor: isCurrentMonth ? "pointer" : "default" }}
                >
                  {renderDayCell(day)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView
