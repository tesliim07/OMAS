import {useState} from 'react'

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
        description:"Comprehensive vision testing and eye health check",
    },
    {
        title: "Vaccination",
        description: "Immunization services for various diseases"
    },
    {      
        title:"Physical Therapy",
        description: "Rehabilitation and pain management sessions"
    },
    {           
        title: "Dermatology Consultation",
        description: "Skin condition diagnosis and treatment"
    }
];


    return (
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
        // <div class="service-container">
        //     <h2>Service Selection</h2>
        //     <div class="card">
        //         <ul>
        //             <li>
        //                 <h4>General Check-up</h4>
        //                 <p>Routine health assessment and consultation</p>
        //             </li>
        //             <li>
        //                 <h4>Dental Cleaning</h4>
        //                 <p>Professional teeth cleaning and oral hygiene</p>
        //             </li>
        //             <li>
        //                 <h4>Eye Exam</h4>
        //                 <p>Comprehensive vision testing and eye health check</p>
        //             </li>
        //         </ul>
        //     </div>
        //     <div class="card2">
        //         <ul>
        //             <li>
        //                 <h4>Vaccination</h4>
        //                 <p>Immunization services for various diseases</p>
        //             </li>
        //             <li>
        //                 <h4>Physical Therapy</h4>
        //                 <p>Rehabilitation and pain management sessions</p>
        //             </li>
        //             <li>
        //                 <h4>Dermatology Consultation</h4>
        //                 <p>Skin condition diagnosis and treatment</p>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    );
};

export default services
