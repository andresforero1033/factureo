import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // 🔥 Enviamos solo email y password porque el backend ya usa email como USERNAME_FIELD
            await axios.post('http://localhost:8000/api/register/', { 
                email, 
                password 
            });

            alert('✅ Registro exitoso, ahora puedes iniciar sesión');
            navigate('/'); // redirige al login
        } catch (error) {
            if (error.response) {
                // mostramos detalle del backend (como "email ya existe")
                alert(error.response.data.detail || JSON.stringify(error.response.data));
            } else {
                alert('Error de conexión al backend');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Factureo</h1>
            <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <h3 className="text-center mb-3">Registro</h3>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                </form>
                <p className="mt-3 text-center">
                    ¿Ya tienes cuenta?{' '}
                    <button className="btn btn-link p-0" onClick={() => navigate('/')}>Login</button>
                </p>
            </div>
        </div>
    );
}

export default Register;
