const Sequelize = require('sequelize');
const db = require('../config/db');

const Altura = db.define('Altura', {
	id_alt: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	alt: {
		type: Sequelize.FLOAT,
	},
});

module.exports = Altura;
