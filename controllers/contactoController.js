const { Resend } = require('resend');
const { body, validationResult } = require('express-validator');

const resend = new Resend(process.env.RESEND_API_KEY);

const ejecutarValidaciones = async (req, res) => {
    await Promise.all([
        
    // Nombre
    body('nombre')
        .trim()
        .notEmpty().withMessage('Nombre requerido')
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('Sólo letras y espacios')
        .escape().run(req),

    // Apellido
    body('apellido')
        .trim()
        .notEmpty().withMessage('Apellido requerido')
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('Sólo letras y espacios')
        .escape().run(req),

    // E-mail
    body('email')
        .trim()
        .isEmail().withMessage('Email inválido')
        .normalizeEmail().run(req),

    // Subject
    body('asunto')
        .trim()
        .notEmpty().withMessage('Asunto requerido')
        .isLength({ max: 200 }).withMessage('Asunto demasiado largo')
        .escape().run(req),

    // Mensaje
    body('mensaje')
        .trim()
        .notEmpty().withMessage('Mensaje requerido')
        .isLength({ max: 255 }).withMessage('Mensaje demasiado largo')
        .escape().run(req),
    ]);

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return {
            hayErrores: true,
            respuesta: res.status(400).json({ success: false, errors: errores.array() })
        };
    }

    return { hayErrores: false };
};

const enviarFormulario = async (req, res) => {
    const validaciones = await ejecutarValidaciones(req, res);

    if (validaciones.hayErrores) {
        return validaciones.respuesta;
    }

    const { nombre, apellido, email, asunto, mensaje } = req.body;

    try {

        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: process.env.RESEND_TO,
            subject: `[Web] ${asunto}`,
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 16px; olor: #333;">
                    <h2>Contacto desde sitio web</h2>
                    <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                    <p><strong>Email:</strong> ${email}</p>

                    <hr>

                    <h3>Asunto</h3>
                    <p>${asunto}</p>

                    <h3>Mensaje</h3>
                    <p style="white-space: pre-line;">${mensaje}</p>
                </div>
            `
        });

        return res.json({ success: true });
    } catch (error) {
        console.error('Error al enviar el correo:', error);

        return res.status(500).json({ success: false, error: 'Error al enviar el correo' });
    }
};

module.exports = { enviarFormulario };
