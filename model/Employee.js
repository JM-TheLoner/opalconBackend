const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone_no: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Employee', employeeSchema)