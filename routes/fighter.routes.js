const express = require('express');
const router = express.Router();
const { pool } = require('../config/database'); //ovo mi treba za komunikaciju s bazom

router.get('/', async (req, res) => {
    return res.render('fighters');
});

module.exports = router;