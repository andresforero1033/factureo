import { authService } from '../services/authService.js';

export function renderSidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    // Aplicamos flexbox para poder empujar el botón al fondo
    aside.style.display = 'flex';
    aside.style.flexDirection = 'column';
    
    aside.innerHTML = `
        <h1 class="logo">Factureo<span>.</span></h1>
        <nav>
            <a href="#" class="active" id="nav-employees">Empleados</a>
            <a href="#" id="nav-contracts">Contratos</a>
        </nav>
        
        <div style="margin-top: auto; padding-top: 2rem;">
            <button id="btn-logout" class="btn-danger" style="width: 100%;">Cerrar Sesión</button>
        </div>
    `;
    
    // Capturamos el botón que acabamos de crear y le asignamos la función de salir
    const btnLogout = aside.querySelector('#btn-logout');
    btnLogout.addEventListener('click', () => {
        authService.logout();
    });
    
    return aside;
}