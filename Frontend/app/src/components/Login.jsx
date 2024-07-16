import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            const roles = response.roles || [];  // Asegurarse de que roles esté definido

            if (roles.includes('admin')) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Login error', error);
            setError('Invalid login credentials');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
