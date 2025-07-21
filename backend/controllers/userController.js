import User from '../models/User.js';
import History from '../models/History.js';

const cartoonAvatars = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Naruto",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Goku",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Luffy",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Totoro",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Doraemon",
  "https://api.dicebear.com/7.x/bottts/svg?seed=AshKetchum",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Shinchan",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Bulbasaur",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Eevee",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Jigglypuff"
];

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { name, avatarUrl } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Assign a random cartoon avatar if avatarUrl is not provided
    const user = new User({
      name: name.trim(),
      avatarUrl: avatarUrl || cartoonAvatars[Math.floor(Math.random() * cartoonAvatars.length)]
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Claim points
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate random points (1-10)
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    user.totalPoints += pointsClaimed;
    await user.save();

    // Create history record
    const history = new History({
      userId,
      pointsClaimed
    });
    await history.save();

    res.json({
      message: `Congratulations! You earned ${pointsClaimed} points!`,
      pointsClaimed,
      newTotal: user.totalPoints,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete all associated claim history
    await History.deleteMany({ userId });

    res.json({ message: 'User and their history deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllUsers,
  addUser,
  claimPoints,
  deleteUser,
};