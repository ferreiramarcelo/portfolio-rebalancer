import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import md5 from 'spark-md5';

 const PasswordResetTokenSchema = new mongoose.Schema({
   email: { type: String, lowercase: true, required: true },
   token: {type: String, required: true},
   createdAt: {type: Date, required: true, default: Date.now, expires: '24h'}
 });

PasswordResetTokenSchema.methods = {

  setToken(token) {
    let passwordResetToken = this;
    passwordResetToken.set('token', token);
    passwordResetToken.save( function (err) {
        if (err) {
          console.log("Error saving password reset token", err);
        }
        console.log("Password reset token", passwordResetToken);
    });
  }

};


export default mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
