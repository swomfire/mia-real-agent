import mongoose from 'mongoose';
const { Schema } = mongoose;

const intentSchema = new Schema(
  {
    intentId: String,
    parameters: {
      type: [String],
      required: true,
      default: [],
    },
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
    collection: 'intent',
  },
);

export default mongoose.model('Intent', intentSchema);
