import mongoose from 'mongoose';

mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(error => console.log(error));

function getAgreements(agreement) {
    let promise;
    if (agreement === undefined) {
        promise = Agreement.find();
    } else if (agreement) {
        promise = findAgreementById(agreement);
    }
    return promise;
}

function findAgreementById(id) {
  return Agreement.findById(id);
}

function addAgreement(agreement) {
  const agreementToAdd = new Agreement(agreement);
  const promise = agreementToAdd.save();
  return promise;
}

function deleteAgreementById(id) {
  return Agreement.findByIdAndDelete(id);
}

export default {
  getAgreements,
  findAgreementById,
  addAgreement,
  deleteAgreementById,
};
