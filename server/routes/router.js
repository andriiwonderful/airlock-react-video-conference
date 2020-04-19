const express = require('express');
const router = express.Router();
const login = require('../controllers/login')
const auth = require('../middleware/auth')
const token = require('../controllers/token')

router.post('/login', login)
router.get('/token', auth, token)
module.exports = router;