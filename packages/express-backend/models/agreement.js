import mongoose from 'mongoose';

const AgreementSchema = new mongoose.Schema(
  {
    emergencyContactRelation: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
      trim: true,
    },
}, 
{ collection: 'agreements' });

const Agreement = mongoose.model('Agreement', AgreementSchema);

export default Agreement;
