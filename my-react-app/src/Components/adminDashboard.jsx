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
        navigate(`/manage-availability/${service.id}`, { 
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

    // Handle create service button
    const handleCreateService = () => {
        navigate('/create-service');
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
                            onClick={handleCreateService}
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
        </div>
    );
};

export default AdminDashboard;
