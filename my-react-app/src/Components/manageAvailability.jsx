import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from "../api";
import axios from "axios";
import { DateTime } from "luxon";
import NavBar from './navbar'

const ManageAvailability = () => {
    const { serviceId, serviceName, selectedDate } = useParams();
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showAddSlotModal, setShowAddSlotModal] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const selectedUtcDate = `${selectedDate}T00:00:00.000Z`;

    useEffect(() => {
    const fetchAvailabilitySlots = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/AvailabilitySlot/getAllAvailabilitySlotsByDateAndServiceName/${selectedUtcDate}/${serviceName}`
        );
        if (response.status === 200) {
          setAvailabilitySlots(response.data);
          console.log("Availability slots fetched:", response.data);
        }
      } catch (error) {
        console.error("Error fetching availability slots:", error);
      }
    };
    fetchAvailabilitySlots();
  }, [isDeleted]);

  const deleteTimeSlot = async (slotId) => {
        try {
            const response = await axios.delete(
                `${API_BASE}/api/AvailabilitySlot/deleteAvailabilitySlot/${slotId}`
            );
            if (response.status === 200) {
                console.log("Service deleted:", response.data);
                setIsDeleted(true);
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleDeleteSlot = (slotId) => {
        if (window.confirm('Are you sure you want to delete this time slot?')) {
            deleteTimeSlot(slotId);
            alert('Time slot deleted successfully!');
            setIsDeleted(false);
        }
    };

    const handleAddSlot = async (e) => {
        e.preventDefault();
        
        if (!startTime || !endTime) {
            alert('Please select start and end times');
            return;
        }

        const startUtcTime = `${selectedDate}T${startTime}:00Z`;
        const endUtcTime = `${selectedDate}T${endTime}:00Z`;

        console.log('Creating availability slot with data:', startUtcTime, endUtcTime);

        try {
            const response = await axios.post(
                `${API_BASE}/api/AvailabilitySlot/createAvailabilitySlots/${serviceId}/${startUtcTime}/${endUtcTime}`,
            );
            if (response.status === 200) {
                console.log("Availability slots created:", response.data);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating availability slots:", error);
        }
        setShowAddSlotModal(false);
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
            <NavBar />
            <div className="calendar-header">
                <div className="calendar-header-content">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <span> › </span>
                        <span className="service-name">
                            {serviceName}
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
                        {availabilitySlots.map((slot) => (
                            <div 
                                key={slot.availabilitySlotId} 
                                className={`time-slot ${!slot.isBooked ? 'available' : 'unavailable'}`}
                            >
                                <div className="time-slot-content">
                                    <span className="time-slot-time">{DateTime.fromISO(slot.slotStartTime).toFormat("HH:mm")}</span>
                                    <span className={`time-slot-status ${!slot.isBooked ? 'status-available' : 'status-unavailable'}`}>
                                        {!slot.isBooked ? 'Available' : 'Booked'}
                                    </span>
                                </div>
                                <div>                                    
                                    <button 
                                        className="btn-delete-slot"
                                        disabled={slot.isBooked}
                                        onClick={() => handleDeleteSlot(slot.availabilitySlotId)}
                                        title="Delete time slot"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {availabilitySlots.length === 0 && (
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
                                <label htmlFor="slotTime">Select Start Time</label>
                                <input
                                    type="time"
                                    id="slotTime"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="slotTime">Select End Time</label>
                                <input
                                    type="time"
                                    id="slotTime"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
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