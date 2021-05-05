const express = require('express');
const app = express();
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');

db.sync()
	.then(() => console.log('Conectado a la BD')) //cuando es exitosa la rutina
	.catch(error => console.log('Este es es el error: ', error)); //cuando hay un error en la rutina

app.use(bodyParser.json()); //leer solicitudes en formato JSON

app.use('/', routes()); //utilizar nuestrar rutas

const port = 4000;

app.listen(port, () => {
	console.log('El servidor esta corriendo por el puerto: ', port);
});
