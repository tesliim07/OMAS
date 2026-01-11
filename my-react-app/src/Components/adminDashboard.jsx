import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Sample service data (will be replaced with backend functionality later
    const [services, setServices] = useState([
        {
            id: 1,
            name: 'General Check-up',
            description: 'Routine health assessment and consultation',
            duration: 30
        },
        {
            id: 2,
            name: 'Dental Cleaning',
            description: 'Professional teeth cleaning and oral hygiene',
            duration: 45
        },
        {
            id: 3,
            name: 'Eye Exam',
            description: 'Comprehensive vision testing and eye health check',
            duration: 30
        },
        {
            id: 4,
            name: 'Vaccination',
            description: 'Immunization services for various diseases',
            duration: 15
        },
        {
            id: 5,
            name: 'Physical Therapy',
            description: 'Rehabilitation and pain management sessions',
            duration: 60
        },
        {
            id: 6,
            name: 'Dermatology Consultation',
            description: 'Skin condition diagnosis and treatment',
            duration: 45
        }
    ]);

    
    const handleServiceClick = (service) => {
        // Navigate to availability management for this service
        navigate(`/calendar-admin/${service.id}`, { 
            state: { service } 
        });
    };

    const handleDeleteService = (serviceId, e) => {
        e.stopPropagation(); 
        
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== serviceId));
            alert('Service deleted successfully!');
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServiceDuration, setNewServiceDuration] = useState('30');

    // Open modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        // Reset form
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServiceDuration('30');
    };

    // Handle create service
    const handleCreateService = (e) => {
        e.preventDefault();
        
        if (!newServiceName || !newServiceDescription || !newServiceDuration) {
            alert('Please fill in all fields');
            return;
        }

        // Create new service
        const newService = {
            id: services.length + 1,
            name: newServiceName,
            description: newServiceDescription,
            duration: parseInt(newServiceDuration)
        };

        setServices([...services, newService]);
        alert('Service created successfully!');
        handleCloseModal();
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header"> 
                <h1>Admin Dashboard</h1>
            </div>

            <div className= "dashboard-content">
                <div className="services-management-section">
                    <div className="section-header"> 
                        <div className="section-header-text">
                            <h2>Manage Services</h2>
                            <p className="section-subtitle">
                                View and manage the list of medical services offered.
                            </p>
                        </div>
                        <button 
                            className="btn-create-service"
                            onClick={handleOpenModal}
                        >
                           + Create Service
                        </button>
                    </div>
                    
                    <div className="services-grid">
                        {services.map((service) => (
                            <div 
                                key={service.id} 
                                className="service-card"
                                onClick={() => handleServiceClick(service)}
                            >
                                <div>
                                    <h3>{service.name}</h3>
                                    <p className="service-description">
                                        {service.description}
                                    </p>
                                    <p className="service-duration">
                                        Duration: {service.duration} minutes
                                    </p>
                                </div>

                                <button
                                    className="btn-delete"
                                    onClick={(e) => handleDeleteService(service.id, e)}
                                >
                                    Delete
                                </button>
                            </div>      
                        ))}
                    </div>

                </div> 
    
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create New Service</h2>
                        <form onSubmit={handleCreateService}>
                            <div className="form-group">
                                <label htmlFor="serviceName">Service Name</label>
                                <input
                                    type="text"
                                    id="serviceName"
                                    value={newServiceName}
                                    onChange={(e) => setNewServiceName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="serviceDescription">Service Description</label>
                                <textarea
                                    type="text"
                                    id="serviceDescription"
                                    value={newServiceDescription}
                                    onChange={(e) => setNewServiceDescription(e.target.value)}
                                    rows = "4"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="serviceDuration">Service Duration</label>
                                <div className="duration-input-group">
                                    <input
                                        type="number"
                                        id="serviceDuration"
                                        value={newServiceDuration}
                                        onChange={(e) => setNewServiceDuration(e.target.value)}                                                        
                                    />
                                    <span>minutes</span>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    Create Service
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
