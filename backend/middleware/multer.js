const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		const fullname =
			uuidv4() + '_' + Date.now() + path.extname(file.originalname);
		cb(null, fullname);
	},
});

module.exports = multer({ storage: storage }).single('image');
