const { QueryTypes } = require('sequelize');
const { viewError } = require('../helpers/helper');
const Altura = require('../models/Altura');
const Humedad = require('../models/Humedad');
const Registro = require('../models/Registro');
const Temperatura = require('../models/Temperatura');

exports.insertRecord = async (req, res) => {
    //obtener variables de la url de la solicitud
	const { idCosecha } = req.params;
    //obtener variables del cuerpo de la solicitud
	const { fecha, temp, hum, alt } = req.body;

	try {
        //SQL para inserta la temperatura
		const [[{ id_temp }]] = await Temperatura.sequelize.query(
			'INSERT INTO Temperaturas (id_temp, temp) ' +
				' VALUES (DEFAULT, $temp)',
			{
				model: Temperatura,
				mapToModel: true,
				bind: { temp },
				type: QueryTypes.INSERT,
			},
		);

        //SQL para inserta la humedad
		const [[{ id_hum }]] = await Humedad.sequelize.query(
			'INSERT INTO Humedads (id_hum, hum) ' + ' VALUES (DEFAULT, $hum)',
			{
				model: Humedad,
				mapToModel: true,
				bind: { hum },
				type: QueryTypes.INSERT,
			},
		);

        //SQL para inserta la altura
		const [[{ id_alt }]] = await Altura.sequelize.query(
			'INSERT INTO Alturas (id_alt, alt) ' + ' VALUES (DEFAULT, $alt)',
			{
				model: Altura,
				mapToModel: true,
				bind: { alt },
				type: QueryTypes.INSERT,
			},
		);

        //SQL para inserta el registro completo
		const [[{ id_reg }]] = await Registro.sequelize.query(
			'INSERT INTO Registros (id_reg, fecha, id_temp, id_hum, id_alt, id_cos) ' +
				' VALUES (DEFAULT, $fecha, $id_temp, $id_hum, $id_alt, $id_cos)',
			{
				model: Registro,
				mapToModel: true,
				bind: {
					fecha,
					id_temp,
					id_hum,
					id_alt,
					id_cos: parseInt(idCosecha),
				},
				type: QueryTypes.INSERT,
			},
		);

        //SQL para obtener el registro creado
		const createdRecord = await Registro.sequelize.query(
			'SELECT * FROM Registros WHERE id_reg = $id_reg',
			{
				bind: { id_reg },
				type: QueryTypes.SELECT,
			},
		);

		res.status(201).json({'registro creado: ': createdRecord});
	} catch (error) {
		viewError(res, error);
	}
};
