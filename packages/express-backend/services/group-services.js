import mongoose from "mongoose";
import groupModel from "../models/groups.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getGroups(roommate) {
  let promise;
  if (roommate === undefined) {
    promise = groupModel.find();
  } else if (roommate) {
    promise = findGroupByRoommate(roommate);
  } 
  return promise;
}

function findGroupById(id) {
  return groupModel.findById(id);
}

function addGroup(group) {
  const groupToAdd = new groupModel(group);
  const promise = groupToAdd.save();
  return promise;
}

function findGroupByRoommate(roommate) {
  return groupModel.find({ roommate: [roommate] });
}

function deleteGroupById(id){
  return groupModel.findByIdAndDelete(id);
}

export default {
  addGroup,
  getGroups,
  findGroupById,
  findGroupByRoommate,
  deleteGroupById
};