import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `All fields are required}`,
      });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        user: {
          ...newUser._doc,
          password: "",
        },
      }); //remove password from response
    }
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      user: { ...user._doc, password: "" },
    });
  } catch (error) {
    console.log("Error logging in", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-movie");
    res.status(200).json({ success: true, message: "You're Logged Out" });
  } catch (error) {
    console.log("Error logout", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user: ", req.user);

    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error Auth check", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
