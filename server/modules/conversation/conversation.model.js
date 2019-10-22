import mongoose from 'mongoose';
import { CONVERSATION_TYPE, CONVERSATION_STATUS } from '../../../common/enums';
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: CONVERSATION_TYPE.TICKET_CONVERSATION,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    members: {
      type: [{ member: { type: Schema.Types.ObjectId, ref: 'User' } }],
      required: true,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: CONVERSATION_STATUS.OPEN,
      enum: [
        CONVERSATION_STATUS.OPEN,
        CONVERSATION_STATUS.CLOSE,
      ],
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

export default mongoose.model('Conversation', conversationSchema);
