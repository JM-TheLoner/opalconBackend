require('dotenv').config()
const express = require('express')
const path = require('path')
const { logger } = require ('./middleware/logEvents')
const { errorHandler } = require ('./middleware/errorHandler')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 1002;
const corsOptions = require ('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require ('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require ('mongoose')
const connectDB = require ('./config/dbConn')

connectDB()

app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))                    //since this works as a waterfall, this is at the top so it affects everything

app.use(express.json())                                             //middleware to handle json files

app.use(cookieParser())                                             //middleware to handle cookies

app.use('/', express.static(path.join(__dirname, '/public')))                

app.use('/', require('./routes/root'))
app.use('/forgot', require('./routes/api/forgot'))
app.use('/login', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/getservices', require('./routes/api/getservices'))
app.use('/refresh', require('./routes/refresh'))

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))
app.use('/services', require('./routes/api/services'))
app.use('/users', require('./routes/api/users'))
app.use('/user', require('./routes/api/user'))

app.all('*', (req, res)=>{                                           //the * means all so this means all urls with given port give this
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html')) 
    } else if (req.accepts('json')) {
        res.json({error: "404 Not Found"}) 
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
