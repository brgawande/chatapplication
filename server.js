const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const chatRoutes = require("./routes/chatRoute.js");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config({
  path: "./config/config.env",
});

const app = express();

connectdb();

app.use(
  cors({
    origin: "https://chat-application-psi-umber.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-application-psi-umber.vercel.app", // Replace with your frontend's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for 'sendMessage' events from the client
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;

    try {
      // Save the message to the database
      const chatMessage = await Chat.create({
        senderId,
        receiverId,
        message,
      });

      // Emit the message to all connected clients
      io.emit("receiveMessage", {
        senderId,
        receiverId,
        message,
        timestamp: chatMessage.timestamp, // Use the timestamp from the database
      });
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
