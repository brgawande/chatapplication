const User = require("../model/userScehma");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(404).json({
      success: false,
      message: "Please Enter all the fields",
    });
  }
  try {
    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
      return res.status(404).json({
        success: false,
        message: "User with this email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    res.status(500).json({
      sucess: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser };
