const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const UserSchema  = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  status: { type: String, required: true, maxlength: 1, default: 0 } //0 belum verifikasi 1 sudah verifikasi 2 booking
});

module.exports = mongoose.model('User', UserSchema);