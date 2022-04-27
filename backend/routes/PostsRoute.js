const express = require('express');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');
const PostsCtrl = require('../controllers/PostsCtrl');
const router = express.Router();
router.post('/create', auth, multer, PostsCtrl.CreatePosts);
router.get('/latest', auth, PostsCtrl.GetLatest);
router.delete('/deletePost', auth, PostsCtrl.DeletePost);

// router.post('/answer', auth, PostsCtrl.AddAnswer);
module.exports = router;
