import mongoose from 'mongoose';
import { FEEDBACK_STATUS } from '../../../common/enums';
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },
    title: {
      type: String,
      required: true,
    },
    feedbacks: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        FEEDBACK_STATUS.OPEN,
        FEEDBACK_STATUS.SOLVED,
      ],
      default: FEEDBACK_STATUS.OPEN,
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
    collection: 'feedback',
  },
);

export default mongoose.model('Feedback', feedbackSchema);
