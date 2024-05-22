import mongoose from 'mongoose';
import Agreement from '../models/agreement.js';

mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(error => console.log(error));

function getAgreements() {
  return Agreement.find();
}

function addAgreement(agreement) {
  const agreementToAdd = new Agreement(agreement);
  return agreementToAdd.save();
}

function deleteAgreementById(id) {
  return Agreement.findByIdAndDelete(id);
}

export default {
  getAgreements,
  addAgreement,
  deleteAgreementById,
};
