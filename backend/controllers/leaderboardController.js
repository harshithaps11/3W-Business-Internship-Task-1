import User from '../models/User.js';

// Get leaderboard with rankings
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ totalPoints: -1, createdAt: 1 })
      .select('name avatarUrl totalPoints');

    const leaderboard = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getLeaderboard
};