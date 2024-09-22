const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage });

router.get('/me', authMiddleware, getProfile);
router.put('/update', authMiddleware, upload.single('profilePicture'), updateProfile);

module.exports = router;
