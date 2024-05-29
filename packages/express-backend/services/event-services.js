import mongoose from "mongoose";
import eventModel from "../models/events.js";


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

function addEvent(events) {
  console.log(events);
  const eventToAdd = new eventModel(events);
  const promise = eventToAdd.save();
  return promise;
}

function findEventByEvent(events) {
  return eventModel.find({ events: events });
}

function findEventByName(name) {
  return eventModel.find({ name: name });
}

function findEventByEventName(events, name) {
  return eventModel.find({ events: events, name: name });
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
