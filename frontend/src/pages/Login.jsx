import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                email: email,   // ✅ usamos email porque tu CustomUser lo requiere
                password: password
            });

            // ✅ Guardamos el access como "token" para que Dashboard.jsx lo encuentre
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);

            // Redirigir al Dashboard
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.detail || 'Usuario o contraseña incorrectos');
            } else {
                alert('Error de conexión al backend');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Factureo</h1>
            <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <h3 className="text-center mb-3">Login</h3>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
                <p className="mt-3 text-center">
                    ¿No tienes cuenta?{' '}
                    <button className="btn btn-link p-0" onClick={() => navigate('/register')}>Regístrate</button>
                </p>
            </div>
        </div>
    );
}

export default Login;
