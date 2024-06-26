import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    event: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid description");
      },
    },
    group_id: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      default: "#000000",
    },
  },
  { collection: "events_list" },
);

const Event = mongoose.model("Event", EventSchema);

export default Event;
