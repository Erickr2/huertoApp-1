const express = require('express');
const app = express();
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config({path: '.env'})

app.use(morgan('dev')); //mostrar en consola las peticiones y codigos de respuesta HTTP

app.use(cors()); //permite tener comunicacion con cualquier otro server

app.use(bodyParser.json()); //leer solicitudes en formato JSON

app.use('/', routes()); //utilizar nuestrar rutas

const port = process.env.PORT || 5000;

//inicializa el web-server y dentro tambien inicializa la conexión a la BD
app.listen(port, () => {
	console.log('El servidor esta corriendo por el puerto: ', port);
	db.sync()
		.then(() => console.log('Conectado a la BD')) //cuando es exitosa la rutina
		.catch(error => console.log('Este es es el error: ', error)); //cuando hay un error en la rutina
});
