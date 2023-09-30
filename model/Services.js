const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price_range: {
        type: String,
        required: false
    },
    image_one:{
        type: String,
        required: false
    },
    image_two:{
        type: String,
        required: false
    },
    image_three:{
        type: String,
        required: false
    }
     
   })

module.exports = mongoose.model('Service', serviceSchema)