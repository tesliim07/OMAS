import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import axios from "axios";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7014/api/Service/getAllServices"
        );
        if (response.status === 200) {
          setServices(response.data);
          console.log("Services fetched:", response.data);
=======
    const serviceList = [
        {
            title: "General Check-up",
            description: "Routine health assessment and consultation",
            duration: 30,
            path: "/calendarView"
        },
        {
            title: "Dental Cleaning",
            description: "Professional teeth cleaning and oral hygiene",
            duration: 30,
            path: "/calendarView"
        },
        {
            title: "Eye Exam",
            description: "Comprehensive vision testing and eye health check",
            duration: 45,
            path: "/calendarView"
>>>>>>> origin/feature/Patient
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

<<<<<<< HEAD
  return (
    <div>
      <NavBar />
      <ul class="service-cards">
        {services.map((service) => (
          <li
            key={service.serviceId}
            onClick={() => navigate("/calendarView")}
            style={{ cursor: "pointer" }}
          >
            <h4>{service.serviceName}</h4>
            <p>{service.serviceDescription}</p>
            <p>Service Duration : {service.durationInMinutes} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
=======
    const serviceList2 = [
        {
            title: "Vaccination",
            description: "Immunization services for various diseases",
            duration: 25,
            path: "/calendarView"
        },
        {
            title: "Physical Therapy",
            description: "Rehabilitation and pain management sessions",
            duration: 60,
            path: "/calendarView"
        },
        {
            title: "Dermatology Consultation",
            description: "Skin condition diagnosis and treatment",
            duration: 25,
            path: "/calendarView"
        }
    ];

    const navigateToTimeSlot = (service) => {
        navigate(service.path, { state: { duration: service.duration, title: service.title } });
    };

    return (
        <div>
            <NavBar />
            <h2>Service Selection</h2>
            <ul class="service-cards">
                {serviceList.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => navigateToTimeSlot(service)}
                        style={{ cursor: "pointer" }}
                    >
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <p>Duration: {service.duration} minutes</p>
                    </li>
                ))}
            </ul>
            <ul class="service-cards2">
                {serviceList2.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => navigateToTimeSlot(service)}
                        style={{ cursor: "pointer" }}
                    >
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <p>Duration: {service.duration} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
>>>>>>> origin/feature/Patient
};

export default Services;
