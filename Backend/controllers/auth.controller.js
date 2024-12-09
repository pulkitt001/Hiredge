import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/jsontoken.js";

export const Signup = async (req, res) => {
  try {
    const { fullname, email, username, password, confirmpassword, position } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already in use" });

    const checkuser = await User.findOne({ username });
    if (checkuser) return res.status(400).json({ error: "Username already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      username,
      password: hashedPassword,
      position,
    });

    await newUser.save();
    return res.status(200).json({ message: "User created successfully 😍" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User doesn't exist with this email" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: "Password is incorrect" });

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: "Login failed, server issue" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: 'Strict',
      path: '/',
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Unable to logout", message: error.message });
  }
};

export const getDetail = async (req, res) => {
  try {
    const userid = req.user_id; // Assuming this is set by authorization middleware
    const user = await User.findById(userid).select("-password");
    if (!user) return res.status(400).json({ error: "User not found" });
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Error fetching user details" });
  }
};
