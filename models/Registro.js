const Sequelize = require('sequelize');
const db = require('../config/db');
const Temperatura = require('./Temperatura');
const Humedad = require('./Humedad');
const Altura = require('./Altura');

const Registro = db.define('Registro', {
	id_reg: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	fecha: {
		type: Sequelize.DATE,
	},
});

Registro.belongsTo(Temperatura, {
	foreignKey: {
		name: 'id_temp',
	},
});
Registro.belongsTo(Humedad, {
	foreignKey: {
		name: 'id_hum',
	},
});
Registro.belongsTo(Altura, {
	foreignKey: {
		name: 'id_alt',
	},
});

module.exports = Registro;
