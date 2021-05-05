const Cosecha = require('../models/Cosecha');
const Registro = require('../models/Registro');
const Humedad = require('../models/Humedad');
const Temperatura = require('../models/Temperatura');
const Altura = require('../models/Altura');

exports.insertHeight = async (req, res) => {
	try {
		const { alt } = req.body;
		const altura = await Altura.create({ alt });
		console.log('esto se guardo en la bd: ', altura);
        res.status(201).send('Se ha guardado la altura');
	} catch (error) {
		console.log('this is the error: ', error);
	}
};

exports.insertHumidity = async (req, res) => {
	try {
		const { hum } = req.body;
        const newHum = (hum/100);
		const humidity = await Humedad.create({ hum: newHum });
		console.log('esto se guardo en la bd: ', humidity);
        res.status(201).send('Se ha guardado la Humedad');
	} catch (error) {
		console.log('this is the error: ', error);
	}
};

exports.insertTemperature = async (req, res) => {
	try {
		const { temp } = req.body;
        const newTemp = (temp/100);
		const temperature = await Temperatura.create({ temp: newTemp });
		console.log('esto se guardo en la bd: ', temperature);
        res.status(201).send('Se ha guardado la temperatura');
	} catch (error) {
		console.log('this is the error: ', error);
	}
};

exports.insertHarvest = async (req, res) => {
	try {
		const { fec_ini, fec_fin, no_plant, RegistroIdReg } = req.body;
		const harvest = await Cosecha.create({ fec_ini, fec_fin, no_plant, RegistroIdReg });
		console.log('esto se guardo en la bd: ', harvest);
        res.status(201).send('Se ha guardado la cosecha');
	} catch (error) {
		console.log('this is the error: ', error);
	}
};

exports.insertRecord = async (req, res) => {
	try {
		const { fecha, id_temp, id_hum, id_alt } = req.body;
		const record = await Registro.create({ fecha, id_temp, id_hum, id_alt });
		console.log('esto se guardo en la bd: ', record);
        res.status(201).send('Se ha guardado el registro');
	} catch (error) {
		console.log('this is the error: ', error);
	}
};