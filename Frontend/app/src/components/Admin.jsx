import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/authService'; // Asegúrate de importar axiosInstance correctamente

const Admin = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchAdminContent = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;

                const response = await axiosInstance.get('/auth/admin', {
                    headers: { 'x-access-token': token }
                });
                setContent(response.data);
            } catch (error) {
                console.error('Admin content error', error);
                setContent('Unauthorized');
            }
        };

        fetchAdminContent();
    }, []);

    return <div>{content}</div>;
};

export default Admin;
