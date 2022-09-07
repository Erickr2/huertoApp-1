const Sequelize = require('sequelize');
const db = require('../config/db');

const Producto = db.define('Peoducto', {
	id_producto: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	nombre: {
		type: Sequelize.STRING(20),
	},
	precio: {
		type: Sequelize.INTEGER(20),
	},
	fecha: {
		type: Sequelize.STRING(20),
	},
	cantidad: {
		type: Sequelize.INTEGER(20),
	},
});

module.exports = Producto;
