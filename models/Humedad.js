const Sequelize = require('sequelize');
const db = require('../config/db');

const Humedad = db.define('Humedad', {
	id_hum: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	hum: {
		type: Sequelize.FLOAT,
	},
});

module.exports = Humedad;
