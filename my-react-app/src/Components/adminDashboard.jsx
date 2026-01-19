import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE } from "../api";
import axios from "axios";
import NavBar from './navbar'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState();
    const [services, setServices] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServiceDuration, setNewServiceDuration] = useState('30');

    useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/Service/getAllServices`
        );
        if (response.status === 200) {
          setServices(response.data);
          console.log("Services fetched:", response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setErrors("Failed to fetch services. Please try again later.");
      }
    };
    fetchServices();
  }, [isDeleted]);

  const deleteService = async (serviceId) => {
        try {
            const response = await axios.delete(
                `${API_BASE}/api/Service/deleteService/${serviceId}`
            );
            if (response.status === 200) {
                console.log("Service deleted:", response.data);
                setIsDeleted(true);
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleServiceClick = (service) => {
        // Navigate to availability management for this service
        navigate(`/calendar-admin/${service.serviceId}/${service.serviceName}`);
    };

    const handleDeleteService = (serviceId, e) => {
        e.stopPropagation(); 
        
        if (window.confirm('Are you sure you want to delete this service?')) {
            deleteService(serviceId);
            alert('Service deleted successfully!');
            setIsDeleted(false);
        }
    };

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

    const createService = async (newService) => {
        try {
            const response = await axios.post(
                `${API_BASE}/api/Service/createService`,
                newService
            );
            if (response.status === 200) {
                console.log("Service created:", response.data);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating service:", error);
        }
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
            serviceName: newServiceName,
            serviceDescription: newServiceDescription,
            durationInMinutes: parseInt(newServiceDuration)
        };
        createService(newService)
        handleCloseModal();
    };

    return (
        <div className="admin-dashboard">
            <NavBar />
            <div className="dashboard-header"> 
                <h1>Admin Dashboard</h1>
            </div>

            {!errors ? (<> <div className= "dashboard-content">
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
                                key={service.serviceId} 
                                className="service-card"
                                onClick={() => handleServiceClick(service)}
                            >
                                <div>
                                    <h3>{service.serviceName}</h3>
                                    <p className="service-description">
                                        {service.serviceDescription}
                                    </p>
                                    <p className="service-duration">
                                        Duration: {service.durationInMinutes} minutes
                                    </p>
                                </div>

                                <button
                                    className="btn-delete"
                                    onClick={(e) => handleDeleteService(service.serviceId, e)}
                                >
                                    Delete
                                </button>
                            </div>      
                        ))}
                    </div>

                </div> 
    
            </div> </> ) : (
                <div className="error-message">
                    <p>{errors}</p>
                </div>
            )}
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
