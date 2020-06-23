const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// user model
const User = require("../models/User");

// login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register user
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check require fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check passwords
  if (password != password2) {
    errors.push({ msg: "Passwords donot matches" });
  }

  // Checks password lengths
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast greater than 6" });
  }

  if (errors.length > 0) {
    // if we have errors then we will re render the register view
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // check if user exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hashing password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hased one
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(() => {
                req.flash("succes_msg", "Registered successfully");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// logout handle
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Logout Successfully ");
  res.redirect("/users/login");
});

module.exports = router;
