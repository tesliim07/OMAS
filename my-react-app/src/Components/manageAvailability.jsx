import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const ManageAvailability = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId } = useParams();
    
    const service = location.state?.service;
    const selectedDate = location.state?.selectedDate;

    //Replace with API data 
    const [timeSlots, setTimeSlots] = useState([
        { id: 1, time: '09:00 AM', available: true },
        { id: 2, time: '09:30 AM', available: true },
        { id: 3, time: '10:00 AM', available: false },
        { id: 4, time: '10:30 AM', available: true },
        { id: 5, time: '11:00 AM', available: true },
        { id: 6, time: '11:30 AM', available: false }
    ]);

    
    const [showAddSlotModal, setShowAddSlotModal] = useState(false);
    const [newSlotTime, setNewSlotTime] = useState('09:00');

    const handleToggleSlot = (slotId) => {
        setTimeSlots(timeSlots.map(slot => 
            slot.id === slotId 
                ? { ...slot, available: !slot.available }
                : slot
        ));
    };

    const handleDeleteSlot = (slotId) => {
        if (window.confirm('Are you sure you want to delete this time slot?')) {
            setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
        }
    };

    const handleAddSlot = (e) => {
        e.preventDefault();
        
        if (!newSlotTime) {
            alert('Please select a time');
            return;
        }

        
        const [hours, minutes] = newSlotTime.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        const formattedTime = `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

        // Check for duplicates
        const exists = timeSlots.some(slot => slot.time === formattedTime);
        if (exists) {
            alert('This time slot already exists!');
            return;
        }

        const newSlot = {
            id: Date.now(),
            time: formattedTime, 
            available: true
        };

        const updatedSlots = [...timeSlots, newSlot].sort((a, b) => {
            return convertTo24Hour(a.time) - convertTo24Hour(b.time);
        });

        setTimeSlots(updatedSlots);
        setShowAddSlotModal(false);
        setNewSlotTime('09:00');
    };

    const convertTo24Hour = (time12) => {
        const [time, period] = time12.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="manage-availability">
            <div className="calendar-header">
                <div className="calendar-header-content">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <span> › </span>
                        <span className="service-name">
                            {service?.name}
                        </span>
                        <span> › </span>
                        <span>
                            {formatDate(selectedDate)}
                        </span>
                    </div>
                   
                </div>
            </div>

            <div className="dashboard-content">
                <div className="services-management-section">
                    <div className="section-header"> 
                        <div className="section-header-text">
                            <h2>{formatDate(selectedDate)}</h2>
                            <p className="section-subtitle">
                                Manage availability slots for this day.
                            </p>
                        </div>
                        <button 
                            className="btn-add-slot"
                            onClick={() => setShowAddSlotModal(true)}
                        >
                           + Create Availability Slots
                        </button>
                    </div>
                    <div className="services-grid">
                        {timeSlots.map((slot) => (
                            <div 
                                key={slot.id} 
                                className={`time-slot ${slot.available ? 'available' : 'unavailable'}`}
                            >
                                <div className="time-slot-content">
                                    <span className="time-slot-time">{slot.time}</span>
                                    <span className={`time-slot-status ${slot.available ? 'status-available' : 'status-unavailable'}`}>
                                        {slot.available ? 'Available' : 'Booked'}
                                    </span>
                                </div>
                                <div>                                    
                                    <button 
                                        className="btn-delete-slot"
                                        onClick={() => handleDeleteSlot(slot.id)}
                                        title="Delete time slot"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {timeSlots.length === 0 && (
                        <div>
                            <p>No time slots available for this date.</p>
                            <p>Click "Add Time Slot" to create one.</p>
                        </div>
                    )}
                </div>
            </div>

            {showAddSlotModal && (
                <div className="modal-overlay" onClick={() => setShowAddSlotModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create Availability Slots</h2>
                        
                        <form onSubmit={handleAddSlot}>
                            <div className="form-group">
                                <label htmlFor="slotTime">Select Time</label>
                                <input
                                    type="time"
                                    id="slotTime"
                                    value={newSlotTime}
                                    onChange={(e) => setNewSlotTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-buttons">
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setShowAddSlotModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    Create Slot
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAvailability;