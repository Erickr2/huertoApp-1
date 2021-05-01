const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'Grhzu92E',
	port: '3306',
	database: 'huerto',
});

module.exports = connection;
