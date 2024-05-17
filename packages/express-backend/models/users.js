import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid username, must be at least 2 characters.");
      },
    },
    group: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;