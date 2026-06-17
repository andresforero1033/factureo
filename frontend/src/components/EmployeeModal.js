import { API_BASE_URL } from '../services/api.js';
import { EmployeeService } from '../services/employeeService.js';
import { renderDashboard } from '../pages/DashboardPage.js';
import { showToast } from '../utils/toast.js';

let editingId = null;
let currentProfilePicture = null;

const API_ROOT = API_BASE_URL.replace(/\/api$/, '');
const DEFAULT_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill="#f1f5f9"/>
        <circle cx="64" cy="50" r="24" fill="#94a3b8"/>
        <path d="M24 112c6-22 24-34 40-34s34 12 40 34" fill="#94a3b8"/>
    </svg>
`)}`;

const OPTIONS = {
    departments: ["Tecnología", "Recursos Humanos", "Finanzas", "Operaciones", "Ventas", "Marketing"],
    positions: ["Junior", "Mid", "Senior", "Líder de Proyecto", "Gerente", "Director"],
    genders: ["Masculino", "Femenino", "Otro", "Prefiero no decir"],
    civil_status: ["Soltero(a)", "Casado(a)", "Unión Libre", "Divorciado(a)", "Viudo(a)"],
    blood_types: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    eps: ["Sanitas", "Sura", "Nueva EPS", "Compensar", "Salud Total", "Famisanar", "Otra"],
    allergies: ["Ninguna", "Penicilina", "Aines", "Alimentos", "Polen", "Otra"],
    relationships: ["Padre/Madre", "Esposo(a)", "Hijo(a)", "Hermano(a)", "Amigo(a)", "Otro"]
};

const generateOptions = (list) => 
    `<option value="">Seleccione...</option>` + 
    list.map(item => `<option value="${item}">${item}</option>`).join('');

function resolveProfilePicture(path) {
    if (!path) return null;
    return path.startsWith('http') ? path : `${API_ROOT}${path}`;
}

export function initEmployeeModal() {
    const modalHTML = `
        <div id="employee-modal" class="modal hidden">
            <div class="modal-content" style="max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 id="modal-title">Registrar Nuevo Empleado</h2>
                    <button id="close-modal" class="btn-close">&times;</button>
                </div>
                <form id="employee-form" class="modal-form">
                    
                    <div class="profile-upload-container">
                        <img id="preview-img" src="${DEFAULT_AVATAR}" alt="Perfil">
                        <div>
                            <label>Cambiar foto de perfil:</label>
                            <input type="file" id="profile_pic_input" accept="image/*">
                        </div>
                    </div>

                    <h4>Información Básica</h4>
                    <input type="text" id="first_name" placeholder="Nombre" required>
                    <input type="text" id="last_name" placeholder="Apellido" required>
                    <input type="email" id="email" placeholder="Correo Electrónico" required>
                    <select id="department" required>${generateOptions(OPTIONS.departments)}</select>
                    <select id="position" required>${generateOptions(OPTIONS.positions)}</select>
                    
                    <h4>Datos Personales</h4>
                    <input type="tel" id="phone" placeholder="Teléfono Personal" required>
                    <input type="text" id="address" placeholder="Dirección de Residencia" required>
                    <input type="date" id="birth_date" required>
                    <select id="gender" required>${generateOptions(OPTIONS.genders)}</select>
                    <select id="civil_status" required>${generateOptions(OPTIONS.civil_status)}</select>
                    <input type="text" id="id_number" placeholder="Número de Identificación" required>

                    <h4>Salud</h4>
                    <select id="blood_type" required>${generateOptions(OPTIONS.blood_types)}</select>
                    <select id="eps" required>${generateOptions(OPTIONS.eps)}</select>
                    <select id="allergies" required>${generateOptions(OPTIONS.allergies)}</select>

                    <h4>Contacto y Familia</h4>
                    <input type="text" id="emergency_name" placeholder="Nombre de contacto emergencia" required>
                    <input type="tel" id="emergency_phone" placeholder="Número de contacto" required>
                    <select id="emergency_relationship" required>${generateOptions(OPTIONS.relationships)}</select>

                    <button type="submit" class="btn-primary">Guardar Empleado</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('employee-modal');
    const form = document.getElementById('employee-form');
    const fileInput = document.getElementById('profile_pic_input');
    const previewImg = document.getElementById('preview-img');

    function resetModalState() {
        editingId = null;
        currentProfilePicture = null;
        form.reset();
        fileInput.value = '';
        previewImg.src = DEFAULT_AVATAR;
    }

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            previewImg.src = URL.createObjectURL(file);
        }
    });

    document.getElementById('btn-new-employee').addEventListener('click', () => openEmployeeModal());
    document.getElementById('close-modal').addEventListener('click', () => {
        resetModalState();
        modal.classList.add('hidden');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let profileUrl = currentProfilePicture;

        if (fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            try {
                const response = await fetch(`${API_ROOT}/api/employees/upload-image`, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) throw new Error('No se pudo subir la imagen');
                const data = await response.json();
                profileUrl = data.url;
            } catch (err) {
                showToast('No se pudo subir la imagen', 'error');
                return;
            }
        }

        const employeeData = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            position: document.getElementById('position').value,
            profile_picture: profileUrl,
            contact_info: {
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            },
            personal_data: {
                birth_date: document.getElementById('birth_date').value,
                gender: document.getElementById('gender').value,
                civil_status: document.getElementById('civil_status').value,
                id_number: document.getElementById('id_number').value
            },
            health_info: {
                blood_type: document.getElementById('blood_type').value,
                eps: document.getElementById('eps').value,
                allergies: document.getElementById('allergies').value
            },
            family_info: {
                emergency_contact_name: document.getElementById('emergency_name').value,
                emergency_contact_phone: document.getElementById('emergency_phone').value,
                emergency_relationship: document.getElementById('emergency_relationship').value
            }
        };

        try {
            if (editingId) {
                await EmployeeService.update(editingId, employeeData);
                showToast('Empleado actualizado correctamente', 'success');
            } else {
                employeeData.is_active = true;
                await EmployeeService.create(employeeData);
                showToast('Empleado guardado correctamente', 'success');
            }
            resetModalState();
            modal.classList.add('hidden');
            renderDashboard();
        } catch (error) {
            showToast(`Error al guardar: ${error.message}`, 'error');
        }
    });
}

export function openEmployeeModal(employee = null) {
    const modal = document.getElementById('employee-modal');
    const form = document.getElementById('employee-form');
    const title = document.getElementById('modal-title');
    const previewImg = document.getElementById('preview-img');
    const fileInput = document.getElementById('profile_pic_input');

    if (employee) {
        editingId = employee.id;
        title.textContent = 'Editar Empleado';
        currentProfilePicture = resolveProfilePicture(employee.profile_picture);

        previewImg.src = currentProfilePicture || DEFAULT_AVATAR;

        document.getElementById('first_name').value = employee.first_name || '';
        document.getElementById('last_name').value = employee.last_name || '';
        document.getElementById('email').value = employee.email || '';
        document.getElementById('department').value = employee.department || '';
        document.getElementById('position').value = employee.position || '';
        
        document.getElementById('phone').value = employee.contact_info?.phone || '';
        document.getElementById('address').value = employee.contact_info?.address || '';

        document.getElementById('birth_date').value = employee.personal_data?.birth_date || '';
        document.getElementById('gender').value = employee.personal_data?.gender || '';
        document.getElementById('civil_status').value = employee.personal_data?.civil_status || '';
        document.getElementById('id_number').value = employee.personal_data?.id_number || '';
        
        document.getElementById('blood_type').value = employee.health_info?.blood_type || '';
        document.getElementById('eps').value = employee.health_info?.eps || '';
        document.getElementById('allergies').value = employee.health_info?.allergies || '';
        
        document.getElementById('emergency_name').value = employee.family_info?.emergency_contact_name || '';
        document.getElementById('emergency_phone').value = employee.family_info?.emergency_contact_phone || '';
        document.getElementById('emergency_relationship').value = employee.family_info?.emergency_relationship || '';
    } else {
        editingId = null;
        currentProfilePicture = null;
        title.textContent = 'Registrar Nuevo Empleado';
        form.reset();
        fileInput.value = '';
        previewImg.src = DEFAULT_AVATAR;
    }
    modal.classList.remove('hidden');
}