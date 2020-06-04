const express = require("express");
const User = require("../model/user.model");
const router = express.Router();

//get userId by email
router.post("/getuser/:email", (req, res, next) => {
  const email = req.params.email;
  User.find({ email: email })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        user: docs.map((doc) => {
          return {
            _id: doc._id,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUser(email, password);
  if (user) {
    req.session.user = user._id;
    res.json({
      message: "You are successfully logged in",
      auth: true,
      email: email,
    });
  } else {
    res.json({
      message:
        "Unable to login. Please check again your e-mail address and password",
      auth: false,
    });
  }
});
router.post("/signup", (req, res) => {
  const user = new User(req.body);
  req.session.user = user._id;
  user
    .save()
    .then((result) => {
      res.json({
        message: "Succesfully created user account",
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to create user",
        auth: false,
      });
    });
});

router.get("/hassignned", (req, res) => {
  if (req.session.user) {
    res.json({
      auth: true,
      message: "You are signed in",
    });
  }
  return res.json({
    auth: false,
    message: "You are not logged in",
  });
});

router.get("/signout", (req, res) => {
  req.session.destroy(); //destroys session
  res.json({
    auth: false,
  });
});

module.exports = router;
