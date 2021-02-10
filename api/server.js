const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./connection')
const NoteSchema = require('./note-model')

const app = express()
const port = 8080


app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db();

//-------------------- ROUTES ---------------------------//

app.post('/add', async (req, res) => {
  let newNote = new NoteSchema ({ content : req.body.content});
  try{
    await newNote.save();
    res.send(newNote)
  } catch(e){
    res.send({erreur : e.message})
  }
})

app.patch('/update/:id', async (req, res) => {
  try{
    let note = await NoteSchema.findOneAndUpdate({_id : req.params.id}, req.body,{useFindAndModify : false, new: true});
    //console.log("note :"+ note)
    if (note && (req.body.content || req.body.status)){
      //console.log("req body" + req.body)
      res.send({message : "Note updated", note : note})
    } else if (note){
      res.send({message : "No change detected"})
    } else {
      res.send({message : "Note not found"})
    }
  } catch(e){
    res.send({erreur : e.message})
  }
})

app.get('/show-pending', async (req,res) => {
  try {
    let notes = await NoteSchema.find({status : "pending"});
    res.send(notes)
  } catch (e){
    res.send({erreur : e.message})
  }
})

app.get('/show-done', async (req,res) => {
  try {
    let notes = await NoteSchema.find({status : "done"});
    res.send(notes)
  } catch (e){
    res.send({erreur : e.message})
  }
})

app.get('/show', async (req,res) => {
  try {
    let notes = await NoteSchema.find();
    res.send(notes)
  } catch (e){
    res.send({erreur : e.message})
  }
})

app.delete('/delete/:id', async (req,res) => {
  try {
    let note = await NoteSchema.findOneAndDelete({_id : req.params.id})
    console.log("note:", note)
    if (note){
      res.send({message : "Note deleted !"})
    } else {
      res.send({message : "Note not found"})
    }
    
  } catch (e){
    res.send({erreur : e.message})
  }
})
//----------------------------------------------------------------//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})