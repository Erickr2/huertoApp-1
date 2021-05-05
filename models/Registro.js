const Sequelize = require('sequelize');
const db = require('../config/db');
const Temperatura = require('./Temperatura');
const Humedad = require('./Humedad');
const Altura = require('./Altura');

const Registro = db.define('Registro', {
    id_reg: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.DATE
    },
    id_temp: {
        type: Sequelize.INTEGER(11),
        references: {
            model: 'Temperatura',
            key: 'id_temp',
        }
    },
    id_hum: {
        type: Sequelize.INTEGER(11),
        references: {
            model: 'Humedad',
            key: 'id_hum',
        }
    },
    id_alt: {
        type: Sequelize.INTEGER(11),
        references: {
            model: 'Altura',
            key: 'id_alt',
        }
    }
});

// Registro.hasOne(Temperatura, {
//     foreignKey: {
//         name: 'id_temp'
//     }
// });

// Registro.hasOne(Humedad, {
//     foreignKey: {
//         name: 'id_hum'
//     }
// });

// Registro.hasOne(Altura, {
//     foreignKey: {
//         name: 'id_alt'
//     }
// });

Registro.belongsTo(Temperatura);
Registro.belongsTo(Humedad);
Registro.belongsTo(Altura);
// Registro.Temperatura = Registro.belongsTo(Temperatura);
// Registro.Humedad = Registro.belongsTo(Humedad);
// Registro.Altura = Registro.belongsTo(Altura);

module.exports = Registro;