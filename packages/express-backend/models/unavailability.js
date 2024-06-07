//unavailbility.js(models)
import mongoose from "mongoose";

const UnavailabilitySchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    roommate: {
      type: String,
      required: true,
      trim: true,
    },
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
  { collection: "unavailabilities_list" },
);

const Unavailability = mongoose.model("Unavailability", UnavailabilitySchema);

export default Unavailability;
