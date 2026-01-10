import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './navbar'

const booking = () => {
    const location = useLocation();
    const {selectedDate, title, time} = location.state;

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error for field as user types
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            navigate("/bookingConfirm", {state: { formData, title, time, selectedDate }});
        }
    }


    return (
        <div>
            <NavBar />
            <form className="booking-info" onSubmit={handleSubmit}>
                <h2>Patient Details</h2>
                <div className="booking-form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        className="booking-info-name"
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="off"
                    />
                    {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                </div>
                <div className="booking-form-group">
                    <label htmlFor="email">Email (for booking confirmation and reminders)</label>
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
                <div className="booking-form-group">
                    <label htmlFor="description">Reason for Visit (Optional)</label>
                    <input
                        className="booking-info-reason"
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your reason (optional)"
                        autoComplete="off"
                    />
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

export default booking
