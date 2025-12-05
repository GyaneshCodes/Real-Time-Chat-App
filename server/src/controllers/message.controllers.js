import uploadOnCloudinary from "../config/cloudinary.config.js";
import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    // get data from userId, params and body
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;

    // check for image
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // find conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiver);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: `send message error: ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({ message: "conversation not found" });
    }

    return res.status(200).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({ message: `get message error: ${error}` });
  }
};
