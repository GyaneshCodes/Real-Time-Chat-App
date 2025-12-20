import uploadOnCloudinary from "../config/cloudinary.config.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const getCurrentUser = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error: ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        image,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `profile error: ${error}` });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get other users error: ${error}` });
  }
};

export const search = async (req, res) => {
  try {
    let { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }

    let users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `search users error: ${error}` });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Update password error: ${error}` });
  }
};
