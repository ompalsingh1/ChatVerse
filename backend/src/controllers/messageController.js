import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { sender, message } = req.body;

        // Validate message
        if (!sender || !message?.trim()) {
            return res.status(400).json({ message: "Sender and message are required" });
        }

        // Create new message

        const newMessage = new Message({ sender, message: message.trim()});
        await newMessage.save();

        // Get senders username alongwith message
        await newMessage.populate("sender", "username");

        res.status(201).json({ message: "Message sent successfully", data: newMessage });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate("sender", "username").sort({ createdAt: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};