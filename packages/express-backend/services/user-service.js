import mongoose from "mongoose";
import userModel from "../models/users.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(username, group) {
  let promise;
  if (username === undefined && group === undefined) {
    promise = userModel.find();
  } else if (username && !group) {
    promise = findUserByName(username);
  } else if (group && !username) {
    promise = findUserByGroup(group);
  } else if (group && username){
    promise = findUserByNameGroup(username, group);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(username) {
  return userModel.find({ username: username });
}

function findUserByGroup(group) {
  return userModel.find({ group: group });
}

function findUserByNameGroup(username, group){
  return userModel.find({username: username, group: group});
}

function deleteUserById(id){
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByGroup,
  deleteUserById
};