const express = require('express');
const router = express.Router();
const { pool } = require('../config/database'); //ovo mi treba za komunikaciju s bazom

const Fighter = require('../models/Fighter');
const Gym = require('../models/Gym');

router.get('/', async (req, res) => {
    try {
        const gyms = await Gym.getAllGyms(); 
        return res.render('fighter_views/addFighter', { gyms });    //Saljem array objekata {gym_id, name}
    } catch (error) {
        console.error('Error fetching gyms:', error);
        res.status(500).send('Database Error');
    }
});

router.post('/', async (req, res) => {
    await Fighter.createFighter(req.body);
    /* const fighters = await Fighter.getAllFighters();     //Provjera - ispis dodanog fightera u konzoli
    console.log(fighters); */
    res.redirect('/fighters');
});

module.exports = router;