export function renderTopbar(title = "Directorio de Empleados") {
    const header = document.createElement('header');
    header.className = 'topbar';
    
    header.innerHTML = `
        <h2>${title}</h2>
        <button id="btn-new-employee" class="btn-primary">+ Nuevo Empleado</button>
    `;
    
    return header;
}