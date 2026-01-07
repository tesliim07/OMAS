import {useNavigate} from 'react-router-dom'

const home = () => {
    const navigate = useNavigate();

    const navList = [
        {text: "Home", path: "/"},
        {text: "Services", path: "/services"},
        {text: "Settings", path: "/settings"}
    ];

    return (
        <nav class="navbar">
            <div class="logo">Medical Appointment Booking</div>
            <ul class="nav-links">
                {navList.map((nav) => (
                    <li 
                    key={nav.text}
                    onClick={() => navigate(nav.path)}
                    style={{ cursor: "pointer" }}
                    >
                        {nav.text}
                    </li>
                ))}
                {/* <li><a href="#home">Home</a></li>
                <li><a href="services.jsx">Services</a></li>
                <li><a href="settings.html">Settings</a></li> */}
            </ul>
        </nav>
    );
};

export default home
