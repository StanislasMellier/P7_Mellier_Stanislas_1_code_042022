const jwt = require('jsonwebtoken');
const Mysql = require('../config/Mysql');
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decodedToken.userId;
		req.auth = { userId };
		Mysql.query(
			'SELECT 1 from users WHERE id = ?',
			[userId],
			(err, result) => {
				if (err) {
					throw 'User Id non valable';
				}
				if (result[0]) {
					next();
				}
			}
		);
	} catch (error) {
		console.log(error);
		res.status(401).json({ error });
	}
};
