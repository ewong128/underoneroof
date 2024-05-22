import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
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

const Events = mongoose.model("Events", EventsSchema);

export default Events;
