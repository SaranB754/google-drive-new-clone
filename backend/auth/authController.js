// backend/auth/authController.js
import * as authService from "./authService.js";

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// LOGOUT CONTROLLER
export const logout = async (req, res) => {
  try {
    await authService.logout();
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
