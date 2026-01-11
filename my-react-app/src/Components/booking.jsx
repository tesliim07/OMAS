import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './navbar'
import axios from 'axios';

const Booking = () => {
    const {serviceName, timeSlotId} = useParams();
    // const [appointmentId, setAppointmentId] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email : ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error for field as user types
    }

    const navigate = useNavigate();
    const createAppointment = async (formData) => {
        const actualFormData = {
            patientFirstName: formData.firstname,
            patientLastName: formData.lastname,
            patientEmail: formData.email
        }
        console.log('Creating appointment with data:', formData);
        try {
            const response = await axios.post(`https://localhost:7014/api/Appointment/createAppointment/${serviceName}/${timeSlotId}`, 
                actualFormData
            );
            if (response.status === 200) {
                console.log('Appointment created successfully:', response.data);
                navigate(`/bookingConfirm/${response.data}/${serviceName}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.firstname.trim()) {
            newErrors.firstname = "First name is required.";
        }
        else if (!formData.lastname.trim()) {
            newErrors.lastname = "Last name is required.";
        }else{
            createAppointment(formData);
        }
        setErrors(newErrors);
    }


    return (
        <div>
            <NavBar />
            <form className="booking-info" onSubmit={handleSubmit}>
                <h2>Patient Details</h2>
                <div className="booking-form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        className="booking-info-name"
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        autoComplete="off"
                    />
                    {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                </div>
                 <div className="booking-form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        className="booking-info-name"
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        autoComplete="off"
                    />
                    {errors.lastname && <span className="error-message">{errors.lastname}</span>}
                </div>
                <div className="booking-form-group">
                    <label htmlFor="email">Email (optional): confirmations & reminders (booking still confirmed without it) : </label>
                    <input
                        className="booking-info-email"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="off"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="confirm-booking-btn">
                    <button type="submit">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Booking;