// Import modules
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Define user model schema
const userSchema = new Schema({
  googleId: String,

  credits: {
    type:    Number,
    default: 0
  }
});

// Create user collection in mongo
mongoose.model('users', userSchema);
