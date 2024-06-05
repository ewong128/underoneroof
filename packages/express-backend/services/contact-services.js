import contactModel from "../models/contact.js";

function getContacts(contact) {
  let promise;
  if (contact === undefined) {
    promise = contactModel.find();
  } else if (contact) {
    promise = findContactById(contact);
  }
  return promise;
}

function findContactById(id) {
  return contactModel.findById(id);
}

function addContact(contact) {
  const contactToAdd = new contactModel(contact);
  const promise = contactToAdd.save();
  return promise;
}

function deleteContactById(id) {
  return contactModel.findByIdAndDelete(id);
}

export default {
  getContacts,
  findContactById,
  addContact,
  deleteContactById,
};
