import mongoose from "mongoose";
import eventModel from "../models/events.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getEvents(events, name) {
  let promise;
  if (events === undefined && name === undefined) {
    promise = eventModel.find();
  } else if (events && !name) {
    promise = findEventByEvent(events);
  } else if (name && !events) {
    promise = findEventByName(name);
  } else if (name && events) {
    promise = findEventByEventName(events, name);
  } 
  return promise;
}

function findEventById(id) {
  return eventModel.findById(id);
}

function addEvent(event) {
  const eventToAdd = new eventModel(event);
  const promise = eventToAdd.save();
  return promise;
}

function findEventByEvent(event) {
  return eventModel.find({ event: event });
}

function findEventByName(name) {
  return eventModel.find({ name: name });
}

function findEventByEventName(event, name) {
  return eventModel.find({ event: event, name: name });
}

function deleteEventById(id) {
  return eventModel.findByIdAndDelete(id);
}

export default {
  addEvent,
  getEvents,
  findEventById,
  findEventByEvent,
  findEventByName,
  findEventByEventName,
  deleteEventById,
};
