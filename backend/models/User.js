import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  avatarUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);