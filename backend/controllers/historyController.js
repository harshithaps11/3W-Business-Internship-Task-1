import History from '../models/History.js';

// Get claim history with pagination
const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const history = await History.find()
      .populate('userId', 'name avatarUrl')
      .sort({ claimedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await History.countDocuments();

    res.json({
      history,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getHistory
};