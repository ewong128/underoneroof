import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactRelation: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    group_id: {
      type: String,
      trim: true,
    },
  },
  { collection: "contacts_list" },
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
