// Import modules
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Define recipient model schema
const recipientSchema = new Schema({
  email:     String,
  responded: {
    type:    Boolean,
    default: false
  }
});

// Export recipient schema
module.exports = recipientSchema;
