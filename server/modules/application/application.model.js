import mongoose from 'mongoose';
import { APPLICATION_STATUS, APPLICATION_TYPE, APPLICATION_LANGUAGE } from '../../../common/enums';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        APPLICATION_STATUS.PENDING,
        APPLICATION_STATUS.REVIEWING,
        APPLICATION_STATUS.REJECTED,
        APPLICATION_STATUS.APPROVED,
      ],
      default: APPLICATION_STATUS.PENDING,
    },
    role: { type: String, enum: [APPLICATION_TYPE.FREELANCER, APPLICATION_TYPE.DEDICATED] },
    nickname: { type: String, trim: true, unique: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    country: { type: String, trim: true },
    postcode: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    categories: [String],
    workExperiences: [
      {
        title: { type: String, trim: true },
        company: { type: String, trim: true },
        address: { type: String, trim: true },
        from: Date,
        to: Date,
        isWorking: Boolean,
        roleDescription: { type: String },
      },
    ],
    educations: [
      {
        school: { type: String, trim: true },
        degree: { type: String, trim: true },
        fieldOfStudy: [String],
        gpa: Number,
        certificate: [String],
      },
    ],
    billingRate: Number,
    skills: [String],
    languages: [
      {
        name: {
          type: String,
          enum: [
            APPLICATION_LANGUAGE.CHINESE,
            APPLICATION_LANGUAGE.ENGLISH,
            APPLICATION_LANGUAGE.JANPANESE,
            APPLICATION_LANGUAGE.VIETNAMESE,
          ],
        },
        writing: Number,
        reading: Number,
        speaking: Number,
        overall: Number,
      },
    ],
    cv: [String],
    social: {
      linkedin: String,
      facebook: String,
      zalo: String,
      github: String,
      gitlab: String,
      stackOverflow: String,
      twitter: String,
      websites: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'application',
  }
);

export default mongoose.model('Application', applicationSchema);
