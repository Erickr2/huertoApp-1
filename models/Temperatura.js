const Sequelize = require('sequelize');
const db = require('../config/db');

const Temperatura = db.define('Temperatura', {
	id_temp: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	temp: {
		type: Sequelize.FLOAT,
	},
});

module.exports = Temperatura;
