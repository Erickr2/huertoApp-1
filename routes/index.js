const express = require('express');
const router = express.Router();
const huertoController = require('../controllers/huertoController');

module.exports = function () {

    /* Insercion en la BD */
    router.post('/altura', huertoController.insertHeight);
    router.post('/humedad', huertoController.insertHumidity);
    router.post('/temperatura', huertoController.insertTemperature);

    router.post('/cosecha', huertoController.insertHarvest);
    router.post('/registro', huertoController.insertRecord);

    return router;
}
