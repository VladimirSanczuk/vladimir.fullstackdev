const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Crear instancia de express
const app = express();


/************************** CONFIGURACIONES BASICAS **************************/

// Usar cors para permitir el acceso al servidor desde dominios distintos
app.use(cors());

// Configurar middleware para manejar datos de formularios
app.use(express.urlencoded({extended: false}));

// Configurar middleware para manejar JSON
app.use(express.json());

// Configurar dotenv
dotenv.config({path: '/env/.env'});

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



/************************************ SERVIDOR *******************************/

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Servidor corriendo correctamente');
});