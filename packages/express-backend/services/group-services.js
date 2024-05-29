import mongoose from "mongoose";
import groupModel from "../models/groups.js";

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
  console.log(roommate)
  return groupModel.find({roommates: roommate});
}

function deleteGroupById(id){
  return groupModel.findByIdAndDelete(id);
}

function updateGroupById(id,body) {
  const promise = groupModel.findByIdAndUpdate(id, body, {new : true});
  return promise;
}


export default {
  addGroup,
  getGroups,
  findGroupById,
  findGroupByRoommate,
  deleteGroupById,
  updateGroupById
};