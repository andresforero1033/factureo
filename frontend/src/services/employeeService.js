import { API_BASE_URL } from './api.js';

export const EmployeeService = {
    // 1. LEER (Obtener todos)
    async getAll() {
        const response = await fetch(`${API_BASE_URL}/employees/`);
        if (!response.ok) throw new Error('Error al obtener empleados');
        return await response.json();
    },

    // 2. CREAR
    async create(employeeData) {
        const response = await fetch(`${API_BASE_URL}/employees/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Error al crear empleado');
        return await response.json();
    },

    // 3. ACTUALIZAR (Editar)
    async update(id, employeeData) {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Error al actualizar empleado');
        return await response.json();
    },

    // 4. ELIMINAR
    async remove(id) {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar empleado');
        return await response.json();
    }
};