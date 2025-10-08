const express = require('express');
const router = express.Router();
const { pool } = require('../config/database'); //ovo mi treba za komunikaciju s bazom
const Gym = require('../models/Gym');

router.get('/', async (req, res) => {
    return res.render('gym_views/addGym');
});

router.post('/', async (req, res) => {
    await Gym.saveGym(req.body);
    res.redirect('/gym');
});

router.delete('/:id', async (req, res) => {
    await Gym.deleteGym(req.params.id);
    res.redirect('/gym');
});



module.exports = router;