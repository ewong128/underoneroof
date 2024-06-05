import eventModel from "../models/events.js";

// mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

function getEvents(startDate, endDate, name) {
  let promise;
  if (startDate === undefined && endDate === undefined && name === undefined) {
    promise = eventModel.find();
  } else if (startDate && !endDate && !name) {
    promise = findEventByStartDate(startDate);
  } else if (endDate && !startDate && !name) {
    promise = findEventByEndDate(endDate);
  } else if (name && !startDate && !endDate) {
    promise = findEventByName(name);
  } else if (startDate && endDate && !name) {
    promise = findEventByDateRange(startDate, endDate);
  } else if (startDate && endDate && name) {
    promise = findEventByDateRangeAndName(startDate, endDate, name);
  }
  return promise;
}

function findEventById(id) {
  return eventModel.findById(id);
}

function addEvent(event) {
  console.log(event);
  const eventToAdd = new eventModel(event);
  const promise = eventToAdd.save();
  return promise;
}

function findEventByStartDate(startDate) {
  return eventModel.find({ startDate: startDate });
}

function findEventByEndDate(endDate) {
  return eventModel.find({ endDate: endDate });
}

function findEventByName(name) {
  return eventModel.find({ name: name });
}

function findEventByDateRange(startDate, endDate) {
  return eventModel.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
  });
}

function findEventByDateRangeAndName(startDate, endDate, name) {
  return eventModel.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
    name: name,
  });
}

function deleteEventById(id) {
  return eventModel.findByIdAndDelete(id);
}

export default {
  addEvent,
  getEvents,
  findEventById,
  findEventByStartDate,
  findEventByEndDate,
  findEventByName,
  findEventByDateRange,
  findEventByDateRangeAndName,
  deleteEventById,
};
