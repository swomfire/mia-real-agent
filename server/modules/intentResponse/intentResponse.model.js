import mongoose from 'mongoose';
const { Schema } = mongoose;

const intentResponseSchema = new Schema(
  {
    response: String,
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    collection: 'response',
  },
);

export default mongoose.model('Response', intentResponseSchema);
