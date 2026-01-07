import {useNavigate} from 'react-router-dom'

const navbar = () => {
    const navigate = useNavigate();

    const navList = [
        {text: "Home", path: "/home"},
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
            </ul>
        </nav>
    );
};


export default navbar
