import preferenceModel from "../models/preferences.js";

function getPreferences(preference) {
  let promise;
  if (preference === undefined) {
    promise = preferenceModel.find();
  } else if (preference) {
    promise = findPrefById(preference);
  }
  return promise;
}

function findPrefById(id) {
  return preferenceModel.findById(id);
}

function addPref(preference) {
  const prefToAdd = new preferenceModel(preference);
  const promise = prefToAdd.save();
  return promise;
}

function deleteAllPreferences() {
  return preferenceModel.deleteMany({});
}

export default {
  getPreferences,
  findPrefById,
  addPref,
  deleteAllPreferences,
};
