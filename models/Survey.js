// Import modules
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const RecipientSchema = require('./Recipient.js');

// Define survey model schema
const surveySchema = new Schema({
  // Survey data
  title:   String,
  body:    String,
  subject: String,

  recipients: [RecipientSchema],

  // Survey answers
  yes: {
    type:    Number,
    default: 0
  },
  no:  {
    type:    Number,
    default: 0
  },

  // Survey owner
  _user: {
    type: Schema.Types.ObjectId,
    ref:  'User'
  },

  dateSent:      Date,
  lastResponded: Date
});

// Create survey collection in mongo
mongoose.model('surveys', surveySchema);
