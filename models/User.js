// Import modules
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  googleId: String
});

// Create user collection in mongo
mongoose.model('users', userSchema);
