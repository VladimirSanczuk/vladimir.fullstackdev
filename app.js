const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Crear instancia de express
const app = express();


/************************** CONFIGURACIONES BASICAS **************************/


app.use(cors()); // Habilitar CORS
app.use(express.urlencoded({extended: false}));  // Parseo de formularios
app.use(express.json()); // Parseo de JSON

// Configurar dotenv
dotenv.config({ path: path.resolve(__dirname, 'env/.env') });

// Configuracion para poder acceder a la carpeta public desde cualquier lugar usando 'recursos'
app.use('/recursos', express.static('public'));
app.use('/recursos', express.static(__dirname + 'public'));

// Configuramos EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



/***************************** RENDERIZAR PAGINAS ****************************/

app.get('/', (req, res) => {
    try{
        res.render('index');
    } catch(error) {
        console.log(error);
        res.status(500).send("Error al renderizar la página principal");
    }
});





/*************************** CONFIGURACION DE RUTAS **************************/

const contactoRoutes = require('./routes/contactoRoutes');
app.use('/api', contactoRoutes);





/*************************** HANDLERS DE ERRORES ****************************/

// 404 - No encontrada
app.use((req, res, next) => {

    const status = res.statusCode && res.statusCode >= 400 && res.statusCode < 500
    ? res.statusCode
    : 404;


    const messages = {
        400: 'Bad Request – La solicitud no pudo ser entendida.',
        401: 'Unauthorized – Necesitas autenticarte para ver esto.',
        403: 'Forbidden – No tienes permiso para acceder aquí.',
        404: 'Not Found – La página no existe.',
        405: 'Method Not Allowed – Este método no está permitido.',
    };

    if (status >= 400 && status < 500) {
        return res.status(status).render('error', {
            code: status,
            message: messages[status] || 'Error en la solicitud.'
        });
    }

    next(); // pasa al handler de 5xx
});

// 500 - Error interno del servidor
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const messages = {
        500: 'Internal Server Error – Algo salió mal en el servidor.',
        502: 'Bad Gateway – Falló la comunicación entre servidores.',
        503: 'Service Unavailable – El servicio está temporalmente caído.',
        504: 'Gateway Timeout – El servidor tardó demasiado en responder.',
    };
    console.error(err.stack);
    res.status(status).render('error', {
        code: status,
        message: messages[status] || 'Error del servidor.'
    });
});






/************************************ SERVIDOR *******************************/

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Servidor corriendo correctamente');
});