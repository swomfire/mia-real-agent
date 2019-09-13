import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    current: {
      type: Boolean,
      required: true,
      default: true,
    },
    version: {
      type: String,
      required: true,
      unique: true,
    },
    exchangeRate: {
      type: Number,
      required: true,
      default: 0,
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
    timestamps: true,
    collection: 'system',
  }
);

export default mongoose.model('System', applicationSchema);
