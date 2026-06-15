import { renderSidebar } from './components/Sidebar.js';
import { renderTopbar } from './components/Topbar.js';
import { renderDashboard } from './pages/DashboardPage.js';
import { initEmployeeModal } from './components/EmployeeModal.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inyectar la Sidebar
    const sidebarRoot = document.getElementById('sidebar-root');
    sidebarRoot.appendChild(renderSidebar());

    // 2. Inyectar la Topbar
    const topbarRoot = document.getElementById('topbar-root');
    topbarRoot.appendChild(renderTopbar("Directorio de Empleados"));

    // 3. Cargar la vista principal (Grilla de empleados)
    renderDashboard();

    // 4. Inicializar el modal (Debe ir al final para que el botón de la Topbar ya exista)
    initEmployeeModal();
});