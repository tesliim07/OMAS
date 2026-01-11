import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './navbar'
import { Info, DateTime, Interval } from 'luxon'


const CalendarView = () => {
  const navigate = useNavigate();
  const today = DateTime.local();
  const { serviceName } = useParams();

  let firstDayOfActiveMonth = today.startOf("month");

  const weekDays = Info.weekdays("short");

  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  )
    .splitBy({ day: 1 })
    .map((day) => day.start);


  const handleDateClick = (date) => {
    console.log("Selected date:", date);
    console.log("Selected date in ISO:", date.toISODate());
    // receives service data, including the duration, and passes the duration along with the selected date when navigating to timeSlot
    navigate(`/timeSlot/${serviceName}/${date.toISODate()}`);
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
              <div class="calendar-headline-month">
                {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
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