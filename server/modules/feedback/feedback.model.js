import mongoose from 'mongoose';
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    feedbacks: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: () => new Date(),
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
    collection: 'conversation',
  },
);

export default mongoose.model('Feedback', feedbackSchema);
