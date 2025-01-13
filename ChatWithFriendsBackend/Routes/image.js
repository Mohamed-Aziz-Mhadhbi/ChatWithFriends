const express = require('express');
const Image = require('../models/image.js');
const router = express.Router();
const multer = require('multer');
filename = '';
const mystorage = multer.diskStorage({
    destination:'./uploads',
    filename: (req, file , redirect)=>{
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        redirect(null  , f1);
        filename= f1;
    }
})
const upload = multer({storage: mystorage});



router.post('/addimg' ,upload.any('image'), async  (req,res) =>{
    data = req.body;
    image = new Image(data);
    image.image = filename;
    image.save()
    
        .then(
            (savedimage) => {
                res.status(200).send(savedimage)
            }
        ).catch(
            (err) => {
                res.status(400).send(err);
            }
        )
        filename = '';
});

module.exports = router;