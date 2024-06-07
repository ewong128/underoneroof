import mongoose from "mongoose";

const ChoreSchema = new mongoose.Schema(
  {
    chore: {
      type: String,
      required: true,
      trim: true,
    },
    roommate: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "Pending...",
    },
    day: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error(
            "Invalid day of the week, must be at least 2 characters.",
          );
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
  { collection: "chores_list" },
);

const Chore = mongoose.model("Chore", ChoreSchema);

export default Chore;
