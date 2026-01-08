import { useNavigate } from 'react-router-dom'
import NavBar from './navbar'

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />  {/* Reuse existing navbar */}

            <div className="landing-content">
                <h2>Welcome to Medical Appointment Booking</h2>
                <p>Please select your role to continue.</p>

                <div className="role-buttons">
                    <button 
                        className="role-button"
                        onClick={() => navigate('/services')}
                    >
                        Patient
                    </button>
                    
                    <button 
                        className="role-button"
                        onClick={() => navigate('/admin')}
                    >
                        Administrator
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;