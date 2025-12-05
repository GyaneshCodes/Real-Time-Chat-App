import genToken from "../config/token.config.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const checkUsername = await User.findOne({ username });

    if (checkUsername) {
      return res.status(400).json({ message: "Username already exist!" });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Signup error:", error);
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400, "All fields are required");
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const isPassowrdValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPassowrdValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = await genToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(200).json(existingUser);
  } catch (error) {
    return res.status(500).json({ message: `Sign In error! ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: unable to logout!` });
  }
};
