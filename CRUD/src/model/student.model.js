const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    age:{type:Number},
    gender:{type:String},
},{
    timestamps:true
})

module.exports = mongoose.model("postStudents",studentSchema)