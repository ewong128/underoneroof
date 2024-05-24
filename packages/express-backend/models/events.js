import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    
	date: {
      type: String,
      required: true,
      trim: true,
    },
	
	time: {
        type: String,
        required: true,
        trim: true,
       
      },
	  events: {
      type: String,
      required: true,
      trim: true,
    },
	name: {
      type: String,
      required: true,
      trim: true,
    },
	description: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (value.length < 2)
            throw new Error("Invalid description");
        },
      },
  },
  { collection: "events_list" }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;
