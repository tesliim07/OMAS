import { useNavigate } from 'react-router-dom'
import NavBar from './navbar'

const services = () => {
    const navigate = useNavigate();

    const serviceList = [
        {
            title: "General Check-up",
            description: "Routine health assessment and consultation",
            path: "/calendar"
        },
        {
            title: "Dental Cleaning",
            description: "Professional teeth cleaning and oral hygiene",
            path: "/calendar"
        },
        {
            title: "Eye Exam",
            description: "Comprehensive vision testing and eye health check",
            path: "/calendar"
        }
    ];

    const serviceList2 = [
        {
            title: "Vaccination",
            description: "Immunization services for various diseases",
            path: "/calendar"
        },
        {
            title: "Physical Therapy",
            description: "Rehabilitation and pain management sessions",
            path: "/calendar"
        },
        {
            title: "Dermatology Consultation",
            description: "Skin condition diagnosis and treatment",
            path: "/calendar"
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
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default services
