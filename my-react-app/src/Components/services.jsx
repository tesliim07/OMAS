import { useState } from 'react'
import NavBar from './navbar'

const services = () => {
    const [selectedService, setSelectedService] = useState(null);

    const serviceList = [
        {
            title: "General Check-up",
            description: "Routine health assessment and consultation"
        },
        {
            title: "Dental Cleaning",
            description: "Professional teeth cleaning and oral hygiene",
        },
        {
            title: "Eye Exam",
            description: "Comprehensive vision testing and eye health check",
        }
    ];

    const serviceList2 = [
        {
            title: "Vaccination",
            description: "Immunization services for various diseases"
        },
        {
            title: "Physical Therapy",
            description: "Rehabilitation and pain management sessions"
        },
        {
            title: "Dermatology Consultation",
            description: "Skin condition diagnosis and treatment"
        }
    ];


    return (
        <div>
            <NavBar />

            <ul class="service-cards">
                {serviceList.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => setSelectedService(service.title)}
                        className={selectedService === service.title ? "active" : ""}
                    >
                        {/* onClick={() => navigate(`/services/${service.id}`)} */}

                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
            <ul class="service-cards2">
                {serviceList2.map((service) => (
                    <li
                        key={service.title}
                        onClick={() => setSelectedService(service.title)}
                        className={selectedService === service.title ? "active" : ""}
                    >
                        {/* onClick={() => navigate(`/services/${service.id}`)} */}

                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default services
