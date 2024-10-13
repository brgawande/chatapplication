const express = require("express");
const {
  registerUser,
  loginUser,
  getSingleUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser/:id", getSingleUser);

module.exports = router;
