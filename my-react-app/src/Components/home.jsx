import {useState} from 'react'

const home = () => {
    const [navBar, setNavBar] = useState(false)
    const navList = [
        {
            text: "Home"
        },
        {
            text: "Services"
        },
        {
            text: "Settings"
        }
    ];

    return (
        <nav class="navbar">
            <div class="logo">Medical Appointment Booking</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="services.jsx">Services</a></li>
                <li><a href="settings.html">Settings</a></li>
            </ul>
        </nav>

        
    )
}

export default home
