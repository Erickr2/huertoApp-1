const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('./Usuario');
const Producto = require('./Producto');

const Orden = db.define('Orden', {
	id_orden: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	fecha: {
		type: Sequelize.STRING(20),
	},
	total: {
		type: Sequelize.INTEGER(20),
	},
});

// on delete no action on update cascade

Orden.belongsTo(Usuario, {
	onUpdate: 'CASCADE',
	onDelete: 'NO ACTION',
});

Orden.hasMany(Producto, {
	onUpdate: 'CASCADE',
	onDelete: 'NO ACTION',
});

module.exports = Orden;
