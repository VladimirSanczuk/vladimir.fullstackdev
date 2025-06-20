document.addEventListener('DOMContentLoaded', () => {


    // Logica de envio del formulario
    const formContacto = document.getElementById('formContacto');

    formContacto.addEventListener('submit', async e => {
        e.preventDefault();


        if (!formContacto.checkValidity()) {
            // esto muestra automáticamente los tooltips de HTML5 y evita el fetch
            formContacto.reportValidity();
            return;
        }

        const data = Object.fromEntries(new FormData(formContacto).entries());

        try {
            const res = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            const resultado = await res.json();

            if (res.ok && resultado.success) {
                showToast('¡Mensaje enviado correctamente!', 'success', 5000);
                formContacto.reset();
            } else if (res.status === 400 && Array.isArray(resultado.errors)) {
                const lista = resultado.errors
                    .map(e => `${e.param}: ${e.msg}`)
                    .join('\n');
                showToast(lista, 'error', 8000);
            } else {
                const msg = resultado.error || 'Ocurrió un error al enviar. Intenta más tarde.';
                showToast(msg, 'error', 5000);
            }
        } catch (networkError) {
            showToast('No se pudo conectar con el servidor.', 'error', 5000);
        }
    });


    // Logica del contador del TextArea
    const areaMensaje = document.getElementById('areaMensaje');
    const contador = document.getElementById('contadorMensaje');
    const LIMITE = 255;

    function actualizarContador() {
        let texto = areaMensaje.value;
        if(texto.length > LIMITE) {
            // Esto es por si hacen un copia y pega mayor a 255
            areaMensaje.value = texto.slice(0, LIMITE);
            texto = areaMensaje.value;
        }
        contador.textContent = `${texto.length}/${LIMITE}`;
    }

    // Escucha el evento input
    areaMensaje.addEventListener('input', actualizarContador);

    actualizarContador();

});

