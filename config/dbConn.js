const mongoose = require ('mongoose')

const DATABASE_URI=`mongodb+srv://JMTheLoner:_Jaymono6@cluster0.6upm9e9.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
    try{
        await mongoose.connect(DATABASE_URI, {          //in this object we will pass in a couple of options that will prevent warnings we would get from mongoDB otherwise
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
    } catch (err){
        console.log(err)
    }
}

module.exports = connectDB