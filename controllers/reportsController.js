const { QueryTypes } = require('sequelize');
const { viewError } = require('../helpers/helper');
const Cosecha = require('../models/Cosecha');


exports.detailOfRecordsPerDay = async (req, res) => {
    const { idCosecha } = req.params;

    try {
        //Consulta para obtener detalle de los registros por día
        const recordsReport = await Cosecha.sequelize.query(
            'SELECT '
            +'    e.nombre AS "nombre cosecha", '
            +'    DATE_FORMAT(fecha, "%d/%m/%Y") AS "fecha", '
            +'    b.temp AS "temperatura", '
            +'    c.hum AS "humedad", '
            +'   d.alt AS "altura" '
            +'FROM '
            +'    Registros AS a '
            +'    INNER JOIN Temperaturas AS b ON b.id_temp = a.id_temp '
            +'    INNER JOIN Humedads AS c ON c.id_hum = a.id_hum '
            +'    INNER JOIN Alturas AS d ON d.id_alt = a.id_alt '
            +'    INNER JOIN Cosechas AS e ON e.id_cos = a.id_cos '
            +'WHERE e.id_cos = $idCosecha',
            {
                bind: { idCosecha },
                type: QueryTypes.SELECT
            }
        );
        //si no trajo resultados la consulta
		if (recordsReport.length === 0) {
			res.status(200).json({
				error: 'El id de cosecha de la solicitud, no existe.',
			});
			return;
		}
        res.status(200).json({ reporte: recordsReport });
    } catch (error) {
        viewError(res, error);
    }
}

exports.harvestDetail = async (req, res) => {
    const { idCosecha } = req.params;

    try {
        //Consulta para obtener el detalle de la cosecha
        const harvestReport = await Cosecha.sequelize.query(
            'SELECT '
            +'   a.nombre, '
            +'   DATE_FORMAT(a.fec_ini, "%d/%m/%Y") AS "fechaIni",'
            +'   DATE_FORMAT(a.fec_fin, "%d/%m/%Y") AS "fechaFin", '
            +'   a.no_plant AS "noPlantas", '
            +'   COUNT(b.id_cos) AS "registrosRealizados", '
            +'   AVG(c.temp) AS "temperaturaPromedio", '
            +'   AVG(d.hum) AS "humedadPromedio", '
            +'   MAX(e.alt) AS "alturaMaxima" '
            +'FROM '
            +'    Cosechas AS a '
            +'    LEFT JOIN Registros AS b ON b.id_cos = a.id_cos '
            +'    INNER JOIN Temperaturas AS c ON c.id_temp = b.id_temp '
            +'    INNER JOIN Humedads AS d ON d.id_hum = b.id_hum '
            +'    INNER JOIN Alturas AS e ON e.id_alt = b.id_alt '
            +'WHERE a.id_cos = $idCosecha '
            +'GROUP BY '
            +'   a.nombre, '
            +'   a.fec_ini, '
            +'   a.fec_fin, '
            +'   a.no_plant '
            ,
            {
                bind: { idCosecha },
                type: QueryTypes.SELECT
            }
        );
        //si no trajo resultados la consulta
		if (harvestReport.length === 0) {
			res.status(200).json({
				error: 'El id de cosecha de la solicitud, no existe.',
			});
			return;
		}
        res.status(200).json({ reporte: harvestReport });
    } catch (error) {
        viewError(res, error);
    }
}