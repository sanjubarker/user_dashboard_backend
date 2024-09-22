const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String},
  profilePicture: {
    data: Buffer, // Store image data as binary
    contentType: String, // Store the file type (e.g., image/jpeg, image/png)
  },
  lastLogin: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
