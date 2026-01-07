import {useState} from 'react'
import NavBar from './navbar'
import {Info, DateTime, Interval} from 'luxon'


const CalendarView = () => {
  const today = DateTime.local();
  const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(
    today.startOf("month")
  );

  const weekDays = Info.weekdays("short");
  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  ).splitBy({day: 1}).map((day) => day.start);

  const goToPreviousMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month:1}))
  };

  const goToNextMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month:1}))
  };

  const goToToday = () => {
    setFirstDayOfActiveMonth(today.startOf("month"))
  };

  return (
    <div>
      <NavBar />

      <h2>Monthly Calendar View - Available Slots</h2>
      
      <div class="calendar-container">
        <div class="calendar">
          <div class="calendar-headline">
            <div class="calendar-headline-month">
              {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
            </div>
            <div class="calendar-headline-controls">
              <div class="calendar-headline-control" onClick={() => goToPreviousMonth()}></div>
              <div class="calendar-headline-controls-today" onClick={() => goToToday()}>Today</div>
              <div class="calendar-headline-control" onClick={() => goToNextMonth()}></div>
            </div>
          </div>
          <div class="calendar-weeks-grid">
            {weekDays.map((weekDay, weekDayIndex) => (
              <div key={weekDayIndex} class="calendar-weeks-grid-cell">{weekDay}</div>
            ))}
          </div>
          <div class="calendar-grid">
            {daysOfMonth.map((daysOfMonth, dayOfMonthIndex) => (
              <div key={dayOfMonthIndex} class="calendar-grid-cell">
                {daysOfMonth.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView
