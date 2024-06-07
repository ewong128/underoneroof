import mongoose from "mongoose";

const PreferencesSchema = new mongoose.Schema(
  {
    preferredContact: {
      type: String,
      required: true,
      enum: ["Text", "Call", "Email", "Other"],
    },
    preferredContactOther: {
      type: String,
      required: function () {
        return this.preferredContact === "Other";
      },
    },
    responseTime: {
      type: String,
      required: true,
      enum: ["Within 12 hours", "Within 24 hours", "Within 48 hours", "Other"],
    },
    responseTimeOther: {
      type: String,
      required: function () {
        return this.responseTime === "Other";
      },
    },
    challengingConversation: {
      type: String,
      required: true,
      enum: [
        "Have it right then and there",
        "Give each other some time to calm down or cool off before sitting down to talk",
        "Schedule a time to chat at least hours or days in advance",
        "Other",
      ],
    },
    challengingConversationOther: {
      type: String,
      required: function () {
        return this.challengingConversation === "Other";
      },
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
      enum: ["Mornings", "Afternoons", "Evenings", "Late nights"],
    },
    studyHouseCondition: {
      type: String,
      required: true,
      enum: ["Silent", "Minimal background noise"],
    },
    sharingPossessions: {
      type: String,
      required: true,
      enum: ["Never", "Sometimes"],
    },
    guestsPolicy: {
      anyTime: { type: Boolean, default: false },
      studyHours: { type: Boolean, default: false },
      midtermsFinals: { type: Boolean, default: false },
      advanceNotice: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      guestsPolicyOther: {
        type: String,
        default: "",
        required: function () {
          return this.guestsPolicy.other === true;
        },
      },
    },
    group_id: {
      type: String,
      trim: true,
    },
  },
  { collection: "preferences_list" },
);

const Preference = mongoose.model("Preference", PreferencesSchema);

export default Preference;
