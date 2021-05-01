const express = require('express');
const app = express();
const db = require('./config/db');


db.connect(() => console.log('Se ha conectado a la BD'));


db.execute(
    'SELECT * FROM `altura` ',
    function(err, results, fields) {
      console.log(results);
      console.log(fields);
    }
);


const port = 4000;

app.listen(port, () => {
    console.log('El servidor esta corriendo por el puerto: ', port);
});