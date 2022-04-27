const { v4: uuidv4 } = require('uuid');
const Mysql = require('../config/Mysql');

exports.CreatePosts = (req, res, next) => {
	if (!req.body || !req.body.title || !req.body.userId) {
		return res.status(400).json({ message: 'Elements manquant' });
	}
	console.log(req.body);
	const postsId = uuidv4();
	const createdBy = req.body.userId;
	const title = req.body.title;
	const desciption = req.body.description ? req.body.description : null;
	const imageUrl = req.file ? req.file.filename : null;

	Mysql.query(
		'INSERT INTO posts (id,createdBy,title,description,imageUrl) VALUES (?,?,?,?,?)',
		[postsId, createdBy, title, desciption, imageUrl],
		(err, results) => {
			if (err) {
				res.status(500).json({
					error: new Error('Internal Server Error'),
				});
			}
			return res.status(201).json({ message: 'Post enregistré' });
		}
	);
};
exports.GetLatest = (req, res, next) => {
	Mysql.query('SELECT * FROM posts order by createdAt', (err, results) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		return res.status(200).json({ results });
	});
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
				console.log(results);
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
				return res.status(500).json({ error: err });
			}
			if (results) {
				return res
					.status(201)
					.json({ message: 'Cemmentaire enregistré' });
			}
		}
	);
};
exports.DeleteAnswer = (req, res, next) => {
	if (!req.body || !req.body.answerId) {
		return res.status(400).json({ error: new Error('Bad Request') });
	}
	Mysql.query(
		'DELETE FROM answer WHERE id=?',
		[req.body.postId],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			if (results) {
				console.log(results);
				if (results.affectedRows === 0) {
					return res
						.status(400)
						.json({ message: 'Commentaire inexistant' });
				}
				return res
					.status(200)
					.json({ message: 'Commentaire supprimé' });
			}
		}
	);
};
