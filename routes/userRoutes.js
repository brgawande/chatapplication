const express = require("express");
const {
  registerUser,
  loginUser,
  getSingleUser,
  logoutUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser/:id", getSingleUser);
router.post("/logout", logoutUser);

module.exports = router;
