// frontend/src/services/authService.js
const AUTH_URL = 'http://localhost:8000/auth';

export const authService = {
    async login(username, password) {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        const data = await response.json();
        localStorage.setItem('factureo_token', data.access_token);
        return data;
    },

    // --- NUEVA FUNCIÓN DE REGISTRO ---
    async register(username, email, password) {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al registrar usuario');
        }

        return await response.json();
    },
    // ---------------------------------

    logout() {
        localStorage.removeItem('factureo_token');
        window.location.href = 'login.html';
    },

    getToken() {
        return localStorage.getItem('factureo_token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};