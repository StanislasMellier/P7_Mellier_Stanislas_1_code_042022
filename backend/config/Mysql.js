const mysql = require('mysql2');

const Mysql = mysql.createConnection({
	host: 'localhost',
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME,
});
module.exports = Mysql;
