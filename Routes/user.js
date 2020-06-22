const express = require("express");
const router = express.Router();

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
  const { name, email, password, confirmPassword } = req.body;
  let errors = [];

  // check require fields
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check passwords
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords donot matches" });
  }

  // Checks password lengths
  if (password.length <= 6) {
    errors.push({ msg: "Password should be atleast greater than 6" });
  }

  if (errors.length > 0) {
    // if we have errors then we will re render the register view
    res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    res.send("pass");
  }
});

module.exports = router;
// https://youtu.be/6FOq4cUdH8k?list=LLB3AQLFERVUvgJfbCz5mNww&t=1295
