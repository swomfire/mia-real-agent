import mongoose from 'mongoose';

const { Schema } = mongoose;
// Form data:
// {
//   fieldName: {
//     label,
//     type,
//     value,
//     comment,
//     validateSchema: 'APPLICATION.FORM_NAME.FIELD',
//   },
// }
const reviewSchema = new Schema(
  {
    fields: {
      type: Object,
      required: true,
    },
    applicationId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Application',
    },
    createdBy: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'review',
  }
);

export default mongoose.model('Review', reviewSchema);
