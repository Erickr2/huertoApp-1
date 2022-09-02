const Sequelize = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('Usuario', {
	id_usuario: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	nombre: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING(20),
	},
	password: {
		type: Sequelize.STRING(200),
	},
});

module.exports = Usuario;
