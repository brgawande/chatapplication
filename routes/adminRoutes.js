const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminControllers");

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
