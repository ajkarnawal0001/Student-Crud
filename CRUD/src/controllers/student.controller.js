const express = require('express')
const Student = require("../model/student.model")
const router = express.Router()
var bodyParser = require('body-parser')
// create application/json parser
var app = express()
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

 router.get("",async (req,res)=>{
    const page = req.query.page || 1;
    const size = req.query.size || 10;

    const offset = (page-1)*size;
    const student = await Student.find().skip(offset).limit(size).lean().exec()
    const totalDocuments = await Student.find().countDocuments();
    const totalPages = Math.ceil(totalDocuments/size)
    return res.status(200).json({student, totalDocuments})
})
router.post("",jsonParser, async (req, res) => {
        if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // const st = await Student.create(req.body);
    // return res.status(201).json({st})
    const { first_name, last_name, email, age,gender } = req.body;
    // console.log(req.body)

    if (!first_name || !last_name || !email || !age ||!gender) {
        return res.status(422).json({ error: "true", message: "Please fill details properly" })
    }

    try {
        const isEmail = await Student.findOne({ email: email })
        // console.log(isUser)
        if (isEmail) {
            return res.status(422).json({
                error: "true",
                message: "Email already exists please login"
            })
        }
        const newUser = await Student.create(req.body)
        if (newUser) {
            res.status(201).json({ error: "false", message: 'User registered successfully' });
        } else {
            res.status(500).json({ error: 'true', message: "Sometthing went wrong plase try again" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: "true", meassage: 'Sorry! something went wrong' });
    }
})
// router.post("", async (req, res) => {
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//     const user = new Student({
//         first_name : req.body.first_name,
//         email : req.body.email,
//         gender: req.body.gender,
//         last_name : req.body.last_name,
//         age:req.body.age
//     })

//         });

router.get("/age",async (req,res)=>{
    const page = req.query.page || 1;
    const size = req.query.size || 10;

    const offset = (page-1)*size;
    const student = await Student.find().sort({age:1}).skip(offset).limit(size).lean().exec()
    const totalDocuments = await Student.find().countDocuments();
    const totalPages = Math.ceil(totalDocuments/size)
    return res.status(200).json({student, totalDocuments})
})

router.get("/male",async (req,res)=>{
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const offset = (page-1)*size;
// male
    const query = {gender:{$eq:"Male"}}

    const student = await Student.find(query).sort({age:1}).skip(offset).limit(size).lean().exec()
    const totalDocuments = await Student.find(query).countDocuments();
    const totalPages = Math.ceil(totalDocuments/size)
    return res.status(200).json({student, totalDocuments})
})

router.get("/female",async (req,res)=>{
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const offset = (page-1)*size;
// male
    const query = {gender:{$eq:"Female"}}

    const student = await Student.find(query).sort({age:1}).skip(offset).limit(size).lean().exec()
    const totalDocuments = await Student.find(query).countDocuments();
    const totalPages = Math.ceil(totalDocuments/size)
    return res.status(200).json({student, totalDocuments})
})


router.get("/:firstName", async (req, res) => {

    try {
        const name = req.params.first_name;
        let student = await Student.findOne({ first_name:first_name  }).lean().exec();

        if (!student) {
            student = await Student.findOne({ _id:first_name  })

                .lean().exec();
        }

        res.status(200).json({ data: student });
    }
    catch (err) {
        res.status(400).json({ error: 'Sorry! something went wrong' });
    }
});

router.delete("/:id",async(req,res)=>{
    const student = await Student.findByIdAndDelete(req.params.id)
    return res.status(200).json({student})
})

module.exports = router

module.exports = router