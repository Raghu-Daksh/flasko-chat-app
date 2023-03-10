const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const socket = require("socket.io");
const messageRoute = require("./routes/messagesRoute");
const path = require('path');
const { ppid } = require("process");





const PORTS = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/message", messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection succesfull"))
  .catch((e) => console.log(e.message));


  // app.use(express.static(path.join(__dirname, '../public/chat-app/build')));

  // app.get('*', (req, res)=>{
  //   res.sendFile(path.join(__dirname, '../public/chat-app /build/index.html'));
  // })

const server = app.listen(PORTS, () => {
  console.log(`server started ${PORTS}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    Credential: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    console.log("send msg ", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
