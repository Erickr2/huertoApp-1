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
	id_usuario:{
        type: Sequelize.STRING(20)
    },
    id_producto: {
        type: Sequelize.STRING(20)
    },
    cantidad: {
        type: Sequelize.INTEGER(5)
    },
    total: {
        type: Sequelize.INTEGER(20)
    }
});

Orden.belongsTo(Usuario, {
    foreignKey: {
        name: 'id_usuario',
    },
});

Orden.belongsTo(Producto, {
    foreignKey: {
        name: 'id_producto',
    },
});

module.exports = Orden; 