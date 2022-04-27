const Mysql = require('../config/Mysql');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
exports.register = (req, res, next) => {
	const { email, password, name } = req.body;
	const userId = uuidv4();
	if (!email || !password || !name) {
		console.log(req.body);
		return res
			.status(400)
			.json({ message: 'Paramètres email et/ou password manquant.' });
	}
	bcrypt
		.hash(password, 10)
		.then((hash) => {
			Mysql.query(
				'INSERT INTO users (id,email,password,name) VALUES (?,?,?,?)',
				[userId, email, hash, name],
				(err, results) => {
					if (err) {
						return res.status(500).json({
							error: new Error('Internal Server Error'),
						});
					}
					res.status(201).json({
						message: 'Utilisateur enregistré',
						userId: userId,
						token: generateJWT(userId),
					});
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
					.status(400)
					.json({ message: 'Utilisateur inexistant' });
			}
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
						token: generateJWT(results[0].id),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		}
	);
};

exports.ChangeProfilePic = (req, res, next) => {
	if (!req.file) {
		return res
			.status(400)
			.json({ message: 'Veuillez joindre un fichier.' });
	}
	if (req.params.id !== req.auth.userId) {
		return res
			.status(403)
			.json({ error: new Error('Requête non authoriser.') });
	}
	const userId = req.params.id;
	Mysql.query(
		'SELECT id,ProfilPicUrl FROM users WHERE id=?',
		[userId],
		(err, userData) => {
			if (err) {
				return res.status(500).json({ err });
			}
			if (!userData[0]) {
				return res
					.status(400)
					.json({ message: 'Utilisateur inexistant' });
			}

			const imageUrl = req.file.filename;

			Mysql.query(
				'UPDATE users SET profilePicUrl=? WHERE id=?',
				[imageUrl, userId],
				(err, results) => {
					if (err) {
						return res.status(500).json({ err });
					}
					if (userData[0].profilePicUrl !== 'default-profile.jpg') {
						console.log('not default');
					}
					res.status(200).json({
						message: 'Photo de profil mis à jour',
					});
				}
			);
		}
	);
};

exports.CheckUser = (req, res, next) => {
	const { userId, token } = req.body;
	// Vérifie si le userId est rattacher a un utilisateur existant
	Mysql.query('SELECT 1 from users WHERE id = ?', [userId], (err, result) => {
		if (err) {
			return res
				.status(400)
				.json({ isValid: false, message: 'Utilisateur inexistant' });
		}
	});

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	if (userId !== decodedToken.userId) {
		return res
			.status(401)
			.json({ isValid: false, message: 'Token invalide' });
	} else {
		return res.status(200).json({ isValid: true, message: 'Token valide' });
	}
};

exports.GetUser = (req, res, next) => {
	const userId = req.params.id;
	Mysql.query(
		'SELECT isAdmin,name,profilePicUrl from users WHERE id=?',
		[userId],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			if (results) {
				const user = results[0];
				return res.status(200).json({ user });
			}
		}
	);
};

function generateJWT(id) {
	return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
		expiresIn: '14d',
	});
}
