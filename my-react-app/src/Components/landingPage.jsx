import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
             <div className="landing-header">
                <h1>Medical Appointment Booking</h1>
            </div>

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
                        onClick={() => navigate('/adminLogin')}
                    >
                        Administrator
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;