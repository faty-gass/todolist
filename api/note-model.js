const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  content: {type :String, required: true},
  status: {type : String, enum : ["pending", "done"], default : "pending" }
});


module.exports = mongoose.model('Note', NoteSchema );