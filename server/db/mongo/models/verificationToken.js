import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import md5 from 'spark-md5';

 const VerificationTokenSchema = new mongoose.Schema({
   email: { type: String, lowercase: true, required: true },
   token: {type: String, required: true},
   createdAt: {type: Date, required: true, default: Date.now, expires: '24h'}
 });

VerificationTokenSchema.methods = {

  setToken(token) {
    let verificationToken = this;
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
        if (err) {
          console.log(err);
          console.log("Error saving verification token", verificationToken);
          return false;
        }
        return true;
    });
  }

};


export default mongoose.model('VerificationToken', VerificationTokenSchema);
