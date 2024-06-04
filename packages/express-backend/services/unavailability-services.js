//unavailability-services.js
import UnavailabilityModel from "../models/unavailability.js";

function getUnavailabilities(eventName, roommate) {
  let promise;
  if (eventName === undefined && roommate === undefined) {
    promise = UnavailabilityModel.find();
  } else if (eventName && !roommate) {
    promise = findUnavailabilityByEventName(eventName);
  } else if (roommate && !eventName) {
    promise = findUnavailabilityByRoommate(roommate);
  } else if (roommate && eventName) {
    promise = findUnavailabilityByEventNameRoommate(eventName, roommate);
  }
  return promise;
}

function findUnavailabilityById(id) {
  return UnavailabilityModel.findById(id);
}

function addUnavailability(unavailability) {
  const unavailabilityToAdd = new UnavailabilityModel(unavailability);
  const promise = unavailabilityToAdd.save();
  return promise;
}

function findUnavailabilityByEventName(eventName) {
  return UnavailabilityModel.find({ eventName: eventName });
}

function findUnavailabilityByRoommate(roommate) {
  return UnavailabilityModel.find({ roommate: roommate });
}

function findUnavailabilityByEventNameRoommate(eventName, roommate) {
  return UnavailabilityModel.find({ eventName: eventName, roommate: roommate });
}

function deleteUnavailabilityById(id) {
  return UnavailabilityModel.findByIdAndDelete(id);
}

export default {
  addUnavailability,
  getUnavailabilities,
  findUnavailabilityById,
  findUnavailabilityByEventName,
  findUnavailabilityByRoommate,
  findUnavailabilityByEventNameRoommate,
  deleteUnavailabilityById,
};
