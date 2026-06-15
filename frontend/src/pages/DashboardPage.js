import { EmployeeService } from '../services/employeeService.js';
import { EmployeeCard } from '../components/EmployeeCard.js';

export async function renderDashboard() {
    const gridContainer = document.getElementById('employee-grid');
    gridContainer.innerHTML = '<p>Cargando directorio...</p>';

    try {
        const employees = await EmployeeService.getAll();
        gridContainer.innerHTML = ''; 
        
        if (employees.length === 0) {
            gridContainer.innerHTML = '<p>No hay empleados registrados.</p>';
            return;
        }

        employees.forEach(employee => {
            // EmployeeCard ya tiene los listeners de Editar/Eliminar
            const cardElement = EmployeeCard(employee);
            gridContainer.appendChild(cardElement);
        });
    } catch (error) {
        gridContainer.innerHTML = `<p style="color: var(--danger);">Error conectando al servidor: ${error.message}</p>`;
    }
}