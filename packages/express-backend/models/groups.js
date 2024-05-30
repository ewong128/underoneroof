import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roommates: {
      type: [String],
      required: true,
      trim: true,
    },
  },
  { collection: "groups_list" },
);

const Group = mongoose.model("Group", GroupSchema);

export default Group;
