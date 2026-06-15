export function renderSidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    
    aside.innerHTML = `
        <h1 class="logo">Factureo<span>.</span></h1>
        <nav>
            <a href="#" class="active" id="nav-employees">Empleados</a>
            <a href="#" id="nav-contracts">Contratos</a>
        </nav>
    `;
    
    return aside;
}