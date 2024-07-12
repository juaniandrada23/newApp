import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/auth/admin', { headers: { 'x-access-token': JSON.parse(localStorage.getItem('user')).token } })
            .then(response => setContent(response.data))
            .catch(error => {
                console.error('Admin content error', error);
                setContent('Unauthorized');
            });
    }, []);

    return <div>{content}</div>;
};

export default Admin;
