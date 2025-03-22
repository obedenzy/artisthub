import * as authService from '../services/authService.js';
import { generateToken } from '../utils/helpers.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    const { user, error } = await authService.registerUser(username, email, password);
    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
    const token = generateToken({ id: user.id, username: user.username });
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Username/email and password are required' });
    }
    const { user, error } = await authService.loginUser(identifier, password);
    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
      const token = generateToken({ id: user.id, username: user.username });
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
