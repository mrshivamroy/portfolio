import mongoose from 'mongoose';

const PopupSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Popup || mongoose.model('Popup', PopupSchema);