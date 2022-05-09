const { v4: uuidv4 } = require('uuid');
const Mysql = require('../config/Mysql');

exports.CreatePosts = (req, res, next) => {
	if (!req.body || !req.body.title || !req.body.userId) {
		return res.status(400).json({ message: 'Elements manquant' });
	}
	const postId = uuidv4();
	const createdBy = req.body.userId;
	const title = req.body.title;
	const desciption = req.body.description ? req.body.description : null;
	const imageUrl = req.file ? req.file.filename : null;

	Mysql.query(
		'INSERT INTO posts (id,createdBy,title,description,imageUrl) VALUES (?,?,?,?,?)',
		[postId, createdBy, title, desciption, imageUrl],
		(err, results) => {
			if (err) {
				res.status(500).json({
					error: new Error('Internal Server Error'),
				});
			}
			return res.status(201).json({ message: 'Post enregistré', postId });
		}
	);
};
exports.GetLatest = (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 3;
	const page = req.query.page ? parseInt(req.query.page) : 0;
	const offset = page * limit;

	Mysql.query(
		'SELECT * FROM posts ORDER BY createdAt DESC LIMIT ?,?',
		[offset, limit],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			return res.status(200).json({ results, page });
		}
	);
};

exports.DeletePost = (req, res, next) => {
	if (!req.body || !req.body.postId) {
		return res.status(400).json({ error: new Error('Bad Request') });
	}
	Mysql.query(
		'DELETE FROM posts WHERE id=?',
		[req.body.postId],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			if (results) {
				if (results.affectedRows === 0) {
					return res.status(400).json({ message: 'Post inexistant' });
				}
				return res.status(200).json({ message: 'Post supprimé' });
			}
		}
	);
};
exports.AddAnswer = (req, res, next) => {
	if (!req.body || !req.body.postId || !req.body.userId) {
		return res.status(400).json({ error: new Error('Bad Request') });
	}
	const answerId = uuidv4();
	const postId = req.body.postId;
	const createdBy = req.body.userId;
	const content = req.body.content;
	Mysql.query(
		'INSERT INTO answers (id,postId,createdBy,content) VALUES (?,?,?,?)',
		[answerId, postId, createdBy, content],
		(err, results) => {
			if (err) {
				return res.status(500).json({
					message:
						'Erreur intere : Veuillez ressayer dans quelques instant',
				});
			}
			if (results) {
				return res
					.status(201)
					.json({ message: 'Cemmentaire enregistré', answerId });
			}
		}
	);
};
exports.DeleteAnswer = async (req, res, next) => {
	if (!req.body || !req.body.answerId) {
		return res.status(400).json({ error: new Error('Bad Request') });
	}
	console.log(req.body.answerId);
	const [rows, fields] = await Mysql.promise().query(
		'SELECT createdBy FROM answers WHERE id=?',
		[req.body.answerId]
	);
	console.log(rows);
	const createdBy = rows[0].createdBy;
	console.log(req.auth);
	if (req.auth.userId !== createdBy) {
		if (!req.auth.isAdmin) {
			return res.status(401).json({
				message: "Vous n'avez pas le droit de supprimer ce commentaire",
			});
		}
	}
	Mysql.query(
		'DELETE FROM answers WHERE id=?',
		[req.body.answerId],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			if (results) {
				if (results.affectedRows === 0) {
					return res
						.status(400)
						.json({ message: 'Commentaire inexistant' });
				}
				console.log('test');
				return res
					.status(200)
					.json({ message: 'Commentaire supprimé' });
			}
		}
	);
	return res.status(200).json({ message: 'Commentaire supprimé' });
};

exports.GetLatestAnswer = (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 3;
	const page = req.query.page ? parseInt(req.query.page) : 0;
	if (!req.query.postId) {
		return res.status(400).json({ error: new Error('Bad Request') });
	}
	const postId = req.query.postId;

	const offset = page * limit;
	Mysql.query(
		'SELECT * FROM answers WHERE postId=? ORDER BY createdAt DESC LIMIT ?,?',
		[postId, offset, limit],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			// console.log(results);
			return res.status(200).json({ results, page });
		}
	);
};
