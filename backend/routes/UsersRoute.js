const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UserCtrl');
const multer = require('../middleware/multer');

router.post('/register', UserCtrl.register);
router.post('/login', UserCtrl.login);

router.put('/profilpic', multer, UserCtrl.ChangeProfilePic);
module.exports = router;
