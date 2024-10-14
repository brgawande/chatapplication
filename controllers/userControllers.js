const User = require("../model/userScehma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
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

    res.status(201).json({
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: "Email And Password are Required",
    });
  }
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(200).json({
        success: false,
        message: "Email Dosen't Exist",
      });
    }

    const passwordMatched = await bcrypt.compare(password, userExist?.password);

    if (!passwordMatched) {
      return res.status(404).json({
        success: false,
        message: "Password Dosen't Matched",
      });
    }

    //   generate jwt token
    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: `Welcome ${userExist?.name}`,
      token,
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // if (!req.cookies.token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Please login first",
    //   });
    // }
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF
    });

    res.status(200).json({
      success: true,
      message: "LoggedOut Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
