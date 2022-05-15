const express = require('express');
const { register, login } = require('../Controllers/signIn');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

module.exports = router;