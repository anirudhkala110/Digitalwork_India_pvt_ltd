const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4 // Generate a random UUID for each new user
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false,
  },
  background: {
    type: String,
    required: false,
  },
  panCard: {
    type: String,
    required: false,
  },
  adCard: {
    type: String,
    required: false,
  },
  Xth: {
    type: String,
    required: false,
  },
  XIIth: {
    type: String,
    required: false,
  },
  pnno: {
    type: String,
    required: false,
  },
  adno: {
    type: String,
    required: false,
  },
  XthM: {
    type: String,
    required: false,
  },
  XIIthM: {
    type: String,
    required: false,
  },
  dob: {
    type: Date, // Store the complete date of birth
    required: false
  },
  // Add additional fields as needed
});

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal;
