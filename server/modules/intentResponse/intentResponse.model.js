import mongoose from 'mongoose';
const { Schema } = mongoose;

const responseSchema = new Schema({
  vn: {
    type: String,
    default: 'phản hồi bằng VN',
  },
  en: {
    type: String,
    default: 'response in EN',
  },
});

const intentResponseSchema = new Schema(
  {
    parameters: {
      type: [String],
      default: [],
    },
    response: responseSchema,
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
