import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/authService';
import authService from '../services/authService'; 
import '../styles/admin.css';

const Admin = () => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchAdminContent = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                setUser(user); // Establecer la información del usuario

                const response = await axiosInstance.get('/auth/admin', {
                    headers: { 'x-access-token': token }
                });
                setContent(response.data);
            } catch (error) {
                console.error('Admin content error', error);
                setContent('Unauthorized');
                if (error.response && error.response.status === 401) {
                    authService.logout();
                }
            }
        };

        fetchAdminContent();
    }, []);

    const handleLogout = () => {
        authService.logout();
    };

    return (
        <div className="admin-container">
            <header className="admin-header">Admin Dashboard</header>
            {user && (
                <div className="admin-card">
                    <h2>User Information</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="admin-card">
                <h2>Admin Content</h2>
                <p>{content}</p>
            </div>
            <footer className="admin-footer">
                &copy; 2024 Your Company. All rights reserved.
            </footer>
        </div>
    );
};

export default Admin;
