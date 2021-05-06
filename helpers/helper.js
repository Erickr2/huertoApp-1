exports.viewError = (res, error) => {
	//pintamos en consola el error, para debuggear
	console.log(
		'' +
        ' ============================================================================================================================================================\n' +
        ' ==================================================================== this is the error: ====================================================================\n' +
        '',
		error,
	);

	//regresamos la respuesta de error en el servidor
	res.status(500).send(
		'Ha ocurrido un error en el servidor, operación no concluida.',
	);
};
