import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import axios from "axios";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7014/api/Service/getAllServices"
        );
        if (response.status === 200) {
          setServices(response.data);
          console.log("Services fetched:", response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

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
};

export default Services;
