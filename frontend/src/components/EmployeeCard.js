import { EmployeeService } from '../services/employeeService.js';
import { renderDashboard } from '../pages/DashboardPage.js';
import { openEmployeeModal } from './EmployeeModal.js';
import { showToast } from '../utils/toast.js';
import { showConfirmDialog } from '../utils/confirmDialog.js';

const API_ROOT = 'http://localhost:8000';
const DEFAULT_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <rect width="96" height="96" rx="24" fill="#0f172a"/>
        <circle cx="48" cy="36" r="18" fill="#94a3b8"/>
        <path d="M16 88c4-16 18-24 32-24s28 8 32 24" fill="#94a3b8"/>
    </svg>
`)}`;

function resolveProfilePicture(path) {
    if (!path) {
        return DEFAULT_AVATAR;
    }

    return path.startsWith('http') ? path : `${API_ROOT}${path}`;
}

export function EmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'card';

    const profilePicture = resolveProfilePicture(employee.profile_picture);
    
    // Aquí es donde definimos el contenido y los botones
    card.innerHTML = `
        <div class="employee-card-header">
            <img class="employee-avatar" src="${profilePicture}" alt="Foto de ${employee.first_name} ${employee.last_name}">
            <div class="employee-identity">
                <h3>${employee.first_name} ${employee.last_name}</h3>
                <p>${employee.position}</p>
                <span class="badge ${employee.is_active ? 'active' : 'inactive'}">
                    ${employee.is_active ? 'Activo' : 'Inactivo'}
                </span>
            </div>
        </div>

        <div class="employee-meta">
            <p><strong>Depto:</strong> ${employee.department}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Tel:</strong> ${employee.contact_info?.phone || 'No registrado'}</p>
        </div>

        <div class="card-actions">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Eliminar</button>
        </div>
    `;

    // Lógica del botón Eliminar
    card.querySelector('.btn-delete').addEventListener('click', async () => {
        const confirmed = await showConfirmDialog({
            title: 'Eliminar empleado',
            message: `¿Quieres eliminar a ${employee.first_name} ${employee.last_name}? Esta acción no se puede deshacer.`,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar'
        });

        if (confirmed) {
            try {
                await EmployeeService.remove(employee.id);
                showToast('Empleado eliminado correctamente', 'success');
                renderDashboard();
            } catch (error) {
                showToast(`No se pudo eliminar: ${error.message}`, 'error');
            }
        }
    });

    // Lógica del botón Editar
    card.querySelector('.btn-edit').addEventListener('click', () => {
        openEmployeeModal(employee);
    });
    
    return card;
}