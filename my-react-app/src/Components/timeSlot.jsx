import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./navbar";
import { DateTime } from "luxon";
import axios from "axios";

const TimeSlot = () => {
  const navigate = useNavigate();

  const { serviceName, selectedDate } = useParams();
  const selectedDateTime = DateTime.fromISO(selectedDate)
    .startOf("day")
    .toUTC()
    .toISO({ suppressMilliseconds: true });
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlotId, setTimeSlotId] = useState(null);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7014/api/AvailabilitySlot/getAllAvailabilitySlotsByDateAndServiceName/${selectedDateTime}/${serviceName}`
        );
        if (response.status === 200) {
          setTimeSlots(response.data);
          console.log("Time slots fetched:", response.data);
        }
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };
    fetchTimeSlots();
  }, [selectedDateTime, serviceName]);

  return (
    <div>
      <NavBar />
      <h2>Time Slot Selection - Daily View</h2>
      <p className="slot-text">Select a Time Slot for Selected Date</p>
      <div className="slot-container">
        <div className="slot">
          <div className="slot-headline">
            <div className="slot-headline-controls">
              <div className="slot-headline-day"> {selectedDate}</div>
            </div>
          </div>
          <div className="slot-time-grid">
            {timeSlots.map((timeSlot) => {
              const isSelected = timeSlotId === timeSlot.availabilitySlotId;
              return (
                <div
                  key={timeSlot.availabilitySlotId}
                  className={[
                    "slot-time-item",
                    timeSlot.isBooked && "booked",
                    isSelected && "selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    if (!timeSlot.isBooked) {
                      setTimeSlotId(timeSlot.availabilitySlotId);
                    }
                  }}
                  style={{
                    cursor: timeSlot.isBooked ? "not-allowed" : "pointer",
                  }}
                >
                  {DateTime.fromISO(timeSlot.slotStartTime).toFormat("HH:mm")}
                </div>
              );
            })}
          </div>
          {!timeSlots.length && (
            <div>
              <h2>No available time slots for this date for this service.</h2>
            </div>
          )}

          <div className="go-booking-btn">
            <button
              disabled={!timeSlotId}
              onClick={() => {
                navigate(`/booking/${serviceName}/${timeSlotId}`);
              }}
            >
              Go to Booking Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
