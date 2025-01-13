const express = require('express');
const router = express.Router();
const Suivi = require('../models/suivi');


router.post('/add' ,   (req,res) =>{
    data = req.body;
    suivi = new Suivi(data);
    suivi.save()
        .then(
            (savedsuivi) => {
                res.status(200).send(savedsuivi)
            }
        ).catch(
            (err) => {
                res.status(400).send(err);
            }
        )
});

module.exports = router;