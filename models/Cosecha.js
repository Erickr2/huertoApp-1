const Sequelize = require('sequelize');
const db = require('../config/db');
const Registro = require('./Registro');

const Cosecha = db.define('Cosecha', {
	id_cos: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	nombre: {
		type: Sequelize.STRING(30),
	},
	fec_ini: {
		type: Sequelize.DATE,
	},
	fec_fin: {
		type: Sequelize.DATE,
	},
	no_plant: {
		type: Sequelize.INTEGER(11),
	},
});

Registro.belongsTo(Cosecha, {
	foreignKey: 'id_cos',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

module.exports = Cosecha;
