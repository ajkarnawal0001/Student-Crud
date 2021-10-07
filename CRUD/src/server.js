const express = require('express')
const connect = require('./database/db')
const studentController = require('./controllers/student.controller')
const app = express()

app.use("/students",studentController)

app.listen(2345,async function(){
    await connect()
    console.log("Running")
})