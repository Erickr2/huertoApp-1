const { QueryTypes } = require('sequelize');
const Cosecha = require('../models/Cosecha');
const { viewError } = require('../helpers/helper');

/*
 *		Cosecha  {	POST, GET (all), GET (by id), PUT, DELETE	}
 */

exports.insertHarvest = async (req, res) => {
	//obtener variables del cuerpo de la solicitud
	const { nombre, fec_ini, fec_fin, no_plant } = req.body;

	try {
		//validar nombre de cosecha este disponible con consulta SQL
		const nameHarvest = await Cosecha.sequelize.query(
			'SELECT nombre FROM Cosechas WHERE nombre = $nombre',
			{
				bind: { nombre },
				type: QueryTypes.SELECT,
			},
		);

		if (nameHarvest.length !== 0) {
			res.status(200).json({
				error: 'El nombre ingresado ya existe, captura uno diferente',
			});
			return;
		}
		//consulta SQL para insertar en la tabla
		await Cosecha.sequelize.query(
			'INSERT INTO Cosechas (id_cos, nombre, fec_ini, fec_fin, no_plant) ' +
				'VALUES(DEFAULT, $nombre, $fec_ini, $fec_fin, $no_plant)',
			{
				bind: {
					nombre,
					fec_ini,
					fec_fin,
					no_plant,
				},
				type: QueryTypes.INSERT,
			},
		);

		//consulta SQL para obtener el recurso creado
		const harvestCreated = await Cosecha.sequelize.query(
			'SELECT id_cos, nombre, fec_ini, fec_fin, no_plant ' +
				'FROM Cosechas ' +
				'WHERE nombre = $nombre ' +
				'	AND no_plant = $no_plant',
			{
				bind: {
					nombre,
					no_plant,
				},
				type: QueryTypes.SELECT,
			},
		);

		//regresamos la respuesta del recurso creado
		res.status(201).json({ cosecha: harvestCreated });
	} catch (error) {
		viewError(res, error);
	}
};

exports.getAllHarvest = async (req, res) => {
	try {
		//consulta SQL para obtener todas las cosechas
		const allHarvest = await Cosecha.sequelize.query(
			'SELECT id_cos, nombre, DATE_FORMAT(fec_ini, "%d/%m/%Y") AS fec_ini, DATE_FORMAT(fec_fin, "%d/%m/%Y") AS fec_fin, no_plant  FROM Cosechas',
			{ type: QueryTypes.SELECT },
		);

		res.status(200).json({ cosechas: allHarvest });
	} catch (error) {
		viewError(res, error);
	}
};

exports.getHarvestById = async (req, res) => {
	//obtener variables de la url de la solicitud
	const { id } = req.params;

	try {
		//consulta SQL para obtener cosecha por id
		const harvest = await Cosecha.sequelize.query(
			'SELECT * FROM Cosechas WHERE id_cos = $id',
			{
				bind: { id },
				type: QueryTypes.SELECT,
			},
		);

		//si no trajo resultados la consulta
		if (harvest.length === 0) {
			res.status(200).json({
				error: 'El id de cosecha de la solicitud, no existe.',
			});
			return;
		}

		res.status(200).json({ 'cosecha: ': harvest });
	} catch (error) {
		viewError(res, error);
	}
};

exports.updateHarvest = async (req, res) => {
	//obtener variables de la url de la solicitud
	const { id } = req.params;
	//obtener variables del cuerpo de la solicitud
	const { nombre, fec_ini, fec_fin, no_plant } = req.body;

	try {
		//validar nombre de cosecha este disponible con consulta SQL
		const nameHarvest = await Cosecha.sequelize.query(
			'SELECT nombre FROM Cosechas WHERE nombre = $nombre',
			{
				bind: { nombre },
				type: QueryTypes.SELECT,
			},
		);

		//validar que el nombre a actualizar este disponible
		if (nameHarvest.length !== 0) {
			res.status(200).json({
				error: 'El nombre ingresado ya existe, captura uno diferente',
			});
			return;
		}

		//consulta SQL para actualizar cosecha por id
		await Cosecha.sequelize.query(
			'UPDATE Cosechas ' +
				'SET nombre = $nombre, fec_ini = $fec_ini, fec_fin = $fec_fin, no_plant = $no_plant ' +
				'WHERE id_cos = $id',
			{
				bind: { nombre, fec_ini, fec_fin, no_plant, id },
				type: QueryTypes.UPDATE,
			},
		);

		//consulta SQL para obtener cosecha por nombre actualizado
		const updatedHarvest = await Cosecha.sequelize.query(
			'SELECT * FROM Cosechas WHERE nombre = $nombre',
			{
				bind: { nombre },
				type: QueryTypes.SELECT,
			},
		);

		res.status(200).json({ 'cosecha actualizada: ': updatedHarvest });
	} catch (error) {
		viewError(res, error);
	}
};

exports.deleteHarvestById = async (req, res) => {
	//obtener variables de la url de la solicitud
	const { id } = req.params;

	try {
		// SQL para eliminar el registro de cosecha
		await Cosecha.sequelize.query(
			'DELETE FROM Cosechas WHERE id_cos = $id',
			{
				bind: { id },
				type: QueryTypes.DELETE,
			},
		);

		await Registros.sequelize.query(
			'DELETE FROM Registros WHERE id_cos = $id',
			{
				bind: { id },
				type: QueryTypes.DELETE,
			},
		);

		res.status(200).json({ error: 'Cosecha eliminada correctamente' });
	} catch (error) {
		viewError(res, error);
	}
};
