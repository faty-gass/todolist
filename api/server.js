const express = require('express')
const app = express()
const port = 8080

const db = require('./connection')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

db();

//-------------------- ROUTES ---------------------------//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})