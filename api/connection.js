//Import the mongoose module
const mongoose = require('mongoose');

async function main(){
  const uri = 'mongodb+srv://dbuser:dbpassword@cluster0.lgimg.mongodb.net/todolist?retryWrites=true&w=majority';
  try {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to mongo!")
  }catch (e){
    console.error(e)
  }
}

/* var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); */

module.exports = main;