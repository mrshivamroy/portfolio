import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  tools: {
    type: [String],
    required: true,
  },
  collaborators: {
    type: [String],
    default: [],
  },
  links: {
  type: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
    }
  ],
  default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);