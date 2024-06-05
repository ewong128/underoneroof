import choreModel from "../models/chores.js";

// mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

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
  console.log(chore);
  const choreToAdd = new choreModel(chore);
  const promise = choreToAdd.save();
  return promise;
}

function updateChoreById(id, body) {
  const promise = choreModel.findByIdAndUpdate(id, body, { new: true });
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
  updateChoreById,
  deleteChoreById,
};
