const jwt = require('jsonwebtoken');
const Mysql = require('../config/Mysql');
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decodedToken.userId;
		req.auth = { userId };
		Mysql.query(
			'SELECT * from users WHERE id = ?',
			[userId],
			(err, result) => {
				if (err) {
					return res
						.status(500)
						.json({ error: new Error('Internal Server Error') });
				}
				if (result[0]) {
					req.auth.isAdmin = result[0].isAdmin;
					next();
				} else {
					return res
						.status(401)
						.json({ error: new Error('Utilisateur Inexistant') });
				}
			}
		);
	} catch (error) {
		return res.status(401).json({ error });
	}
};
