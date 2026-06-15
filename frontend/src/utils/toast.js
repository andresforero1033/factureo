let toastContainerInitialized = false;

function ensureToastContainer() {
    if (toastContainerInitialized) {
        return;
    }

    if (document.getElementById('toast-container')) {
        toastContainerInitialized = true;
        return;
    }

    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    toastContainerInitialized = true;
}

export function showToast(message, type = 'success') {
    ensureToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    window.setTimeout(() => {
        toast.classList.remove('show');
        window.setTimeout(() => {
            toast.remove();
        }, 220);
    }, 2800);
}