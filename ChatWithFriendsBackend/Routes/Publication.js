const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");
const multer = require("multer");
filename = "";
const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let f1 = date + "." + file.mimetype.split("/")[1];
    redirect(null, f1);
    filename = f1;
  },
});
const upload = multer({ storage: mystorage });

router.post("/AddPub", upload.any("image"), async (req, res) => {
  data = req.body;
  pub = new Publication(data);
  pub.image = filename;
  pub
    .save()
    .then((savedPublication) => {
      res.status(200).send(savedPublication);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  filename = "";
});

router.post("/login", (req, res) => {
  const query = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne(query, (err, result) => {
    if (result != null) {
      const objToSend = {
        email: result.email,
        password: result.password,
      };

      // set user ID in session

      res.status(200).send(JSON.stringify(objToSend));
    } else {
      res.status(404).send();
    }
  });
});

router.get("/getallPublication", (req, res) => {
  Publication.find()
    .then((publications) => {
      res.status(200).send(publications);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getuser/:id", (req, res) => {
  myid = req.params.id;
  User.findOne({ _id: myid })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/deleteuser/:id", (req, res) => {
  id = req.params.id;
  User.findOneAndDelete({ _id: id })
    .then((deleteuser) => {
      res.status(200).send(deleteuser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/updateuser/:id", (req, res) => {
  id = req.params.id;
  data = req.body;
  User.findByIdAndUpdate({ _id: id }, data)
    .then((updated) => {
      res.status(200).send(updated);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
