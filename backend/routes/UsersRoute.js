const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UserCtrl');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

router.post('/register', UserCtrl.register);
router.post('/login', UserCtrl.login);

router.post('/check', auth, UserCtrl.CheckUser);
router.get('/:id', auth, UserCtrl.GetUser);
router.put('/profilpic', auth, multer, UserCtrl.ChangeProfilePic);
router.delete('/', auth, UserCtrl.DeleteUser);
module.exports = router;
