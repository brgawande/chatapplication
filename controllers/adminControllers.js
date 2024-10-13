const User = require("../model/userScehma");

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});

    res.status(200).json({
      success: true,
      allUser: allUser.length > 0 ? allUser : [],
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user dosent exist",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
