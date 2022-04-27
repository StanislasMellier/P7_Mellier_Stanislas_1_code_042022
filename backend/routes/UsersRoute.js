const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UserCtrl');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

router.post('/register', UserCtrl.register);
router.post('/login', UserCtrl.login);

router.post('/check', UserCtrl.CheckUser);
router.get('/:id', auth, UserCtrl.GetUser);
router.put('/profilpic/:id', auth, multer, UserCtrl.ChangeProfilePic);
module.exports = router;
