const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'info', duration = 5000) {

    // type: 'success' | 'error' | 'info'
    const colorMap = {
        success: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800' },
        error: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-800' },
        info: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800' },
    };
    const cfg = colorMap[type] || colorMap.info;

    // crear el toast
    const toast = document.createElement('div');
    toast.className = [
        'max-w-sm', 'w-full', 'pointer-events-auto', 'border', 
        'rounded-lg', 'shadow-lg', 'p-3', 'flex', 'items-center', 
        cfg.bg, cfg.border, cfg.text
    ].join(' ');


    // contenido (icono + texto + botón cerrar)
    toast.innerHTML = `
        <div class="mr-2 flex-shrink-0">
            ${ type === 'success' ? 
                `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>` 
                : type === 'error' ?
                `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>`
                :
                `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                </svg>`
            }
        </div>

        <div class="flex-1 text-sm">${message}</div>
    `;

    // añadir al DOM
    toastContainer.appendChild(toast);

    // auto-destruir tras duration ms
    setTimeout(() => {
        if (toast.parentNode === toastContainer) {
            toastContainer.removeChild(toast);
        }
    }, duration);
}

// Exponer al global para usarlo desde cualquier script
window.showToast = showToast;