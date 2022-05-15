const express = require('express');
const { showData } = require('../Controllers/profile');
const router = express.Router();

router.post('/', showData);

module.exports = router;