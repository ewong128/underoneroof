import mongoose from "mongoose";
import choreModel from "../models/chores.js";

function getChores(chore, roommate) {
  let promise;
  if (chore === undefined && roommate === undefined) {
    promise = choreModel.find();
  } else if (chore && !roommate) {
    promise = findChoreByChore(chore);
  } else if (roommate && !chore) {
    promise = findChoreByRoommate(roommate);
  } else if (roommate && chore) {
    promise = findChoreByChoreRoommate(chore, roommate);
  }
  return promise;
}

function findChoreById(id) {
  return choreModel.findById(id);
}

function addChore(chore) {
  const choreToAdd = new choreModel(chore);
  const promise = choreToAdd.save();
  return promise;
}

function findChoreByChore(chore) {
  return choreModel.find({ chore: chore });
}

function findChoreByRoommate(roommate) {
  return choreModel.find({ roommate: roommate });
}

function findChoreByChoreRoommate(chore, roommate) {
  return choreModel.find({ chore: chore, roommate: roommate });
}

function deleteChoreById(id) {
  return choreModel.findByIdAndDelete(id);
}

export default {
  addChore,
  getChores,
  findChoreById,
  findChoreByChore,
  findChoreByRoommate,
  findChoreByChoreRoommate,
  deleteChoreById,
};
