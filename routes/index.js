const express = require('express');
const router = express.Router();
const cosechaController = require('../controllers/cosechaController');
const registroController = require('../controllers/registroController');
const reportsController = require('../controllers/reportsController');

module.exports = function () {

	//CRUD para Cosecha
	router.get('/cosecha', cosechaController.getAllHarvest);
	router.get('/cosecha/:id', cosechaController.getHarvestById);
	router.post('/cosecha', cosechaController.insertHarvest);
	router.put('/cosecha/:id', cosechaController.updateHarvest);
	router.delete('/cosecha/:id', cosechaController.deleteHarvestById);

	//insertar Registro diario de la cosecha
	router.post('/registro/:idCosecha', registroController.insertRecord);

	//reportes
	router.get('/reporte-registros-diarios/:idCosecha', reportsController.detailOfRecordsPerDay);
	router.get('/reporte-cosecha/:idCosecha', reportsController.harvestDetail);

	return router;
};
