const express = require('express');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');
const PostsCtrl = require('../controllers/PostsCtrl');
const router = express.Router();
router.post('/create', auth, multer, PostsCtrl.CreatePosts);
router.get('/latest', auth, PostsCtrl.GetLatest);
router.delete('/', auth, PostsCtrl.DeletePost);

router.post('/answer', auth, PostsCtrl.AddAnswer);
router.get('/answer/latest', auth, PostsCtrl.GetLatestAnswer);
router.delete('/answer/', auth, PostsCtrl.DeleteAnswer);
module.exports = router;
