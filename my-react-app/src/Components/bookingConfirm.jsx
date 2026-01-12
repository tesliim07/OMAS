import NavBar from './navbar'
import { useNavigate, useLocation } from 'react-router-dom';

const bookingConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { formData, selectedDate, time, title } = location.state;
    const {fullname, email, description} = formData;

    return (
        <div>
            <NavBar />
            <div class="confirmation-container">
                <h2>Booking Confirmed!</h2>
                <p class="confirm-text">Your appointment has been successfully booked.</p>

                <h3>Booking</h3>
                <div>
                    <p>Service: 
                        <span class="service-title">{title} </span>
                    </p>
                </div>
                <div>
                    <p>Date: 
                        <span class="date">{selectedDate} </span>
                        </p>
                </div>
                <div>
                    <p>Time: 
                        <span class="time">{time} </span>
                        </p>
                </div>
                <div>
                    <p>Patient Name: 
                        <span class="name">{fullname} </span>
                        </p>
                </div>
                <div>
                    <p>Email: 
                        <span class="email">{email} </span>
                        </p>
                </div>
                <div>
                    <p>A confirmation email with all the details has been sent to your email.</p>
                </div>
            </div>
        </div>
    )
}

export default bookingConfirm
