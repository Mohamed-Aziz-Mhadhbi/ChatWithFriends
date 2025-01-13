const express = require("express");
const router = express.Router();
const Publication2 = require("../models/publication2");

// image uploads needs :
const multer = require('multer');
filename ='';
const mystorage = multer.diskStorage({
    destination : './uploads4' , 
    filename: (req ,file ,redirect) =>{
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        redirect(null , f1);
        filename = f1 ;
    }
})
const upload = multer({storage : mystorage}); 

// Route GET pour obtenir toutes les publications
router.get("/", async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route POST pour créer une nouvelle publication
router.post("/", upload.any("imageprod"), async (req, res) => {
  const publication = new Publication({
    image_user: req.body.image_user,
    name_user: req.body.name_user,
    contenu: req.body.contenu,
    image: req.params.image,
  });

  try {    
    publication.image = filename;
    publication.image_user = filename;
    filename = "";
    const newPublication = await publication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




module.exports = router;
