import Message from "../models/messageModel.js";

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // =========================
    // User Comes Online
    // =========================
    socket.on("userOnline", (username) => {
      if (!username) return;

      onlineUsers.set(socket.id, username);

      io.emit("onlineUsers", Array.from(onlineUsers.values()));

      console.log(`${username} is online`);
    });

    // =========================
    // Send Message
    // =========================
    socket.on("sendMessage", async (data) => {
      try {
        const { sender, message } = data;

        if (!sender || !message?.trim()) {
          socket.emit("messageError", {
            message: "Sender and message are required",
          });

          return;
        }

        const newMessage = new Message({
          sender,
          message: message.trim(),
        });

        await newMessage.save();

        await newMessage.populate("sender", "username");

        io.emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Socket message error:", error);

        socket.emit("messageError", {
          message: "Failed to send message",
        });
      }
    });

    // =========================
    // Typing Indicator
    // =========================
    socket.on("typing", (username) => {
      socket.broadcast.emit("userTyping", username);
    });

    socket.on("stopTyping", () => {
      socket.broadcast.emit("userStoppedTyping");
    });

    // =========================
    // User Disconnect
    // =========================
    socket.on("disconnect", () => {
      const username = onlineUsers.get(socket.id);

      onlineUsers.delete(socket.id);

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.values())
      );

      if (username) {
        console.log(`${username} went offline`);
      }

      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;