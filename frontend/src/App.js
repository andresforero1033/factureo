// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos las páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router> {/* Habilita el enrutamiento */}
      <Routes> {/* Contenedor de todas las rutas */}
        <Route path="/" element={<Login />} />         {/* Página de login */}
        <Route path="/register" element={<Register />} /> {/* Página de registro */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Página principal */}
      </Routes>
    </Router>
  );
}

export default App;
