import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
        
        // validation logic
        if(!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if(email === 'admin@gmail.com' && password === 'admin123') {
            navigate('/adminDashboard');
        } else {
            setError('Invalid credentials');
        }
    };
    
    return (
        <div>
            <div className = "landing-header">
                <h1>Medical Appointment Booking </h1>
            </div>

            <div className="login-page"> 
                <div className="login-card">
                    <h2>Admin Login</h2>

                    <form onSubmit={handleLogin}> 
                        <div className="form-group"> 
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                placeholder="admin@example.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="form-group"> 
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="login-button">
                            Login
                        </button>

                        <button 
                            type="button" 
                            className="back-button"
                            onClick={() => navigate('/')}
                        >
                            Back to Landing Page
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default AdminLogin;