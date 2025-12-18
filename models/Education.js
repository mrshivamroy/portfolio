import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  marks: {
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

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);