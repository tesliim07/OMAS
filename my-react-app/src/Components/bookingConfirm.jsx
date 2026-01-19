import NavBar from "./navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../api";
import axios from "axios";
import { DateTime } from "luxon";

const BookingConfirm = () => {
  const { appointmentId, serviceName } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/Appointment/getAppointmentById/${appointmentId}`
        );
        if (response.status === 200) {
          setAppointment(response.data);
          console.log("Appointment fetched:", response.data);
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };
    const fetchIsSentAppointmentConfirmation = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/Appointment/sendAppointmentConfirmation/${appointmentId}`
        );
        if (response.status === 200) {
          console.log("Appointment Email Sent:", response.data);
        }
      } catch (error) {
        console.error("Error sending appointment email confirmation:", error);
      }
    };
    fetchAppointment();
    fetchIsSentAppointmentConfirmation();
  }, [appointmentId]);

  return (
    <div>
      <NavBar />

      <div className="confirmation-container">
        <h2>Booking Confirmed!</h2>
        <p className="confirm-text">
          Your appointment has been successfully booked.
        </p>

        {appointment && (
          <>
            <div>
              <p>Service: {serviceName}</p>
            </div>

            <div>
              <p>
                Date:{" "}
                {DateTime.fromISO(appointment.appointmentDateTime).toFormat(
                  "dd-MM-yyyy"
                )}
              </p>
            </div>

            <div>
              <p>
                Time:{" "}
                {DateTime.fromISO(appointment.appointmentDateTime).toFormat(
                  "HH:mm"
                )}
              </p>
            </div>

            <div>
              <p>
                Patient Name: {appointment.patientFirstName}{" "}
                {appointment.patientLastName}
              </p>
            </div>

            {appointment.patientEmail && (
              <div>
                <p>Email: {appointment.patientEmail}</p>
                <p>
                  A confirmation email with all the details has been sent to
                  your email.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingConfirm;
