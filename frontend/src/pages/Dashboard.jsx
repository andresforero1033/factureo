import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirige al login si no hay token
        } else {
            // Petición opcional para obtener info del usuario
            axios.get('http://localhost:8000/api/user/', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    navigate('/');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Factureo</h1>
            <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h3 className="text-center mb-3">Dashboard</h3>
                {user && <p className="text-center">Bienvenido, {user.email}</p>}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
