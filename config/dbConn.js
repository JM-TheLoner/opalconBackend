const mongoose = require ('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {          //in this object we will pass in a couple of options that will prevent warnings we would get from mongoDB otherwise
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
    } catch (err){
        console.log(err)
    }
}

module.exports = connectDB