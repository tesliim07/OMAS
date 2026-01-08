import { useNavigate } from 'react-router-dom'
import NavBar from './navbar'

const services = () => {
    const navigate = useNavigate();

    const serviceList = [
        {
            title: "General Check-up",
            description: "Routine health assessment and consultation",
            duration: `Duration: ${30} minutes`,
            path: "/calendarView"
        },
        {
            title: "Dental Cleaning",
            description: "Professional teeth cleaning and oral hygiene",
            duration: `Duration: ${30} minutes`,
            path: "/calendarView"
        },
        {
            title: "Eye Exam",
            description: "Comprehensive vision testing and eye health check",
            duration: `Duration: ${45} minutes`,
            path: "/calendarView"
        }
    ];

    const serviceList2 = [
        {
            title: "Vaccination",
            description: "Immunization services for various diseases",
            duration: `Duration: ${25} minutes`,
            path: "/calendarView"
        },
        {
            title: "Physical Therapy",
            description: "Rehabilitation and pain management sessions",
            duration: `Duration: ${1} hour`,
            path: "/calendarView"
        },
        {
            title: "Dermatology Consultation",
            description: "Skin condition diagnosis and treatment",
            duration: `Duration: ${25} minutes`,
            path: "/calendarView"
        }
    ];


    return (
        <div>
            <NavBar />

            <ul class="service-cards">
                {serviceList.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => navigate(service.path)}
                        style={{ cursor: "pointer" }}
                    >
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <p>{service.duration}</p>
                    </li>
                ))}
            </ul>
            <ul class="service-cards2">
                {serviceList2.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => navigate(service.path)}
                        style={{ cursor: "pointer" }}
                    >
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <p>{service.duration}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default services
