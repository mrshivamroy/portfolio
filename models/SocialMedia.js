import mongoose from 'mongoose';

const SocialMediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SocialMedia || mongoose.model('SocialMedia', SocialMediaSchema);