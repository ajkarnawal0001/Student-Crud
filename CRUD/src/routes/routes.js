const express = require('express')
const { getStudent } = require('../controllers/student.controller')

const route = express.Router()

route.get('', getStudent)