import { useNavigate } from 'react-router-dom'
import NavBar from './navbar'

const services = () => {
    const navigate = useNavigate();

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
        }
    ];

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
};

export default services
