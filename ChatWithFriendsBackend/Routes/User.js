const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");

let filename = "";
const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    const date = Date.now();
    const f1 = `${date}.${file.mimetype.split("/")[1]}`;
    callback(null, f1);
    filename = f1;
  },
});
const upload = multer({ storage: mystorage });

router.post("/signup", upload.any("image"), async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);
    user.image = filename;
    const savedUser = await user.save();
    res.status(200).json(savedUser);
    filename = "";
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/don", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("Utilisateur introuvable");
      return;
    }

    const userToSend = {
      id: user._id,
      email: user.email,
      password: user.password,
    };

    res.status(200).json(userToSend);
  } catch (error) {
    res.status(401).send("Token invalide");
  }
});

router.post("/login", async (req, res) => {
  try {
    const query = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await User.findOne(query);

    if (result) {
      const objToSend = {
        email: result.email,
        password: result.password,
      };

      res.status(200).json(objToSend);
    } else {
      res.status(404).send("wrong password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const myid = req.params.id;
    const user = await User.findOne({ _id: myid });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Utilisateur introuvable");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await User.findOneAndDelete({ _id: id });
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await User.findByIdAndUpdate({ _id: id }, data);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const nodemailerFrom = "contactvidoc@gmail.com";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true pour TLS
  auth: {
    user: "adem.wertani@esprit.tn",
    pass: "bzkykucyfyfcgjcr",
  },
});

router.post("/sendPasswordRecoveryEmail", async (request, result) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const email = request.body.email;

    if (!email) {
      result.json({
        status: "error",
        message: "Please enter your e-mail address.",
      });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      result.json({
        status: "error",
        message: "Email does not exist.",
      });
      return;
    }

    const minimum = 0;
    const maximum = 999999;
    const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          code: randomNumber,
        },
      }
    );

    const emailHtml = `Your password reset code is: <b style='font-size: 30px;'>${randomNumber}</b>.`;
    const emailPlain = `Your password reset code is: ${randomNumber}.`;

    const mailOptions = {
      from: nodemailerFrom,
      to: email,
      subject: "Password reset code",
      text: emailPlain,
      html: emailHtml,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });

    result.json({
      status: "success",
      message: "A verification code has been sent to your email address.",
    });
  } catch (error) {
    result.status(500).send(error.message);
  }
});

router.post("/resetPassword", async (req, result) => {
  try {
    const code = req.body.code;
    const password = req.body.password;

    if (!code || !password) {
      result.json({
        status: "error",
        message: "Please fill all fields.",
      });
      return;
    }

    const user = await User.findOne({
      code: code,
    });

    if (!user) {
      result.json({
        status: "error",
        message: "Invalid email code.",
      });
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = await bcryptjs.hashSync(password, salt);

    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          password: password,
        },
        $unset: {
          code: "",
        },
      }
    );

    result.json({
      status: "success",
      message: "Password has been changed.",
    });
  } catch (error) {
    result.status(500).send(error.message);
  }
});

module.exports = router;
