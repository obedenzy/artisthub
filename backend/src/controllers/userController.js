import * as userService from '../services/userService.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { user, error } = await userService.getUserProfile(userId);

    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile fetched successfully', user });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
