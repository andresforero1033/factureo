let confirmContainerInitialized = false;

function ensureConfirmContainer() {
    if (confirmContainerInitialized) {
        return;
    }

    if (document.getElementById('confirm-dialog-root')) {
        confirmContainerInitialized = true;
        return;
    }

    const root = document.createElement('div');
    root.id = 'confirm-dialog-root';
    document.body.appendChild(root);
    confirmContainerInitialized = true;
}

export function showConfirmDialog({ title, message, confirmText = 'Eliminar', cancelText = 'Cancelar' }) {
    ensureConfirmContainer();

    return new Promise((resolve) => {
        const root = document.getElementById('confirm-dialog-root');

        root.innerHTML = `
            <div class="confirm-dialog-overlay">
                <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
                    <h3 id="confirm-dialog-title">${title}</h3>
                    <p>${message}</p>
                    <div class="confirm-dialog-actions">
                        <button type="button" class="btn-secondary" data-action="cancel">${cancelText}</button>
                        <button type="button" class="btn-danger" data-action="confirm">${confirmText}</button>
                    </div>
                </div>
            </div>
        `;

        const overlay = root.querySelector('.confirm-dialog-overlay');
        const dialog = root.querySelector('.confirm-dialog');
        const cancelButton = root.querySelector('[data-action="cancel"]');
        const confirmButton = root.querySelector('[data-action="confirm"]');

        const close = (result) => {
            root.innerHTML = '';
            resolve(result);
        };

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                close(false);
            }
        });

        cancelButton.addEventListener('click', () => close(false));
        confirmButton.addEventListener('click', () => close(true));

        window.setTimeout(() => {
            confirmButton.focus();
        }, 0);

        dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                close(false);
            }
        });
    });
}