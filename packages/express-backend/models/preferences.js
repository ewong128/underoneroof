import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema(
  {
    preferredContact: {
      type: String,
      required: true,
      trim: true,
    },
    preferredContactOther: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    responseTime: {
      type: String,
      required: true,
      trim: true,
    },
    responseTimeOther: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    challengingConversation: {
        type: String,
        required: true,
        trim: true,
    },
    challengingConversationOther: {
        type: String,
        required: true,
        trim: true,
        default: "",
    },
    weekdaySleepHours: {
        type: String,
        required: true,
        trim: true,
    },
    weekendSleepHours: {
        type: String,
        required: true,
        trim: true,
    },
    quietStudyTime: {
        type: String,
        required: true,
        trim: true,
    },
    studyHouseCondition: {
        type: String,
        required: true,
        trim: true,
    },
    sharingPossessions: {
        type: String,
        required: true,
        trim: true,
    },
    guestsPolicy: {
        anyTime: { type: Boolean, default: false },
        studyHours: { type: Boolean, default: false },
        midtermsFinals: { type: Boolean, default: false },
        advanceNotice: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
        guestsPolicyOther: { type: String, default: '' },
      },
  }, 
  { collection: 'preferences_list' }
);

const Preference = mongoose.model("Preference", PreferencesSchema);

export default Preference;
