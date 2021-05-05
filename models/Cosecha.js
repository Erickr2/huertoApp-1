const Sequelize = require('sequelize');
const db = require('../config/db');
const Registro = require('./Registro');

const Cosecha = db.define('Cosecha', {
	id_cos: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
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
	id_reg: {
		type: Sequelize.INTEGER(11),
		references: {
			model: 'Registro',
			key: 'id_reg',
		},
	},
});

// Cosecha.hasMany(Registro, {
//     foreignKey: {
//         name: 'id_reg'
//     }
// });
Cosecha.belongsTo(Registro);

// Cosecha.Registro = Cosecha.belongsTo(Registro);

module.exports = Cosecha;
