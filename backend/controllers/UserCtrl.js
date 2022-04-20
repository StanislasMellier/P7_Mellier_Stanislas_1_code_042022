const Mysql = require('../config/Mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
exports.register = (req, res, next) => {
	// const email = req.body.email;
	// const password = req.body.password;
	// const name = req.body.name;
	const { email, password, name } = req.body;
	if (!email || !password || !name) {
		return res
			.status(400)
			.json({ message: 'Paramètres email et/ou password manquant.' });
	}
	bcrypt
		.hash(password, 10)
		.then((hash) => {
			Mysql.query(
				'INSERT INTO users (id,email,password,name) VALUES (?,?,?,?)',
				[uuidv4(), email, hash, name],
				(err, results) => {
					if (err) {
						return res.status(500).json({ err });
					}
					res.status(201).json({ message: 'Utilisateur enregistré' });
				}
			);
		})
		.catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res, next) => {
	const { email, password } = req.body;
	Mysql.query(
		'SELECT * FROM users WHERE email = ?',
		[email],
		(err, results) => {
			if (err) {
				return res.status(500).json({ err });
			}
			if (!results[0]) {
				return res
					.status(401)
					.json({ message: 'Utilisateur inexistant' });
			}
			console.log(results);
			bcrypt
				.compare(password, results[0].password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ message: 'Mot de passe incorrect' });
					}
					res.status(200).json({
						userId: results[0].id,
						token: jwt.sign(
							{ userId: results[0].id },
							process.env.JWT_SECRET,
							{ expiresIn: '24h' }
						),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		}
	);
};
