const Chat = require("../model/chatSchema");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = await Chat.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Message Send Successfully",
      chat: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const { senderId } = req.query;

    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: senderId },
        { sender: senderId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
