const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  usertoken: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  responses: Schema.Types.Mixed,
});

// const Response = mongoose.model("tresponse", responseSchema);

module.exports = responseSchema;
