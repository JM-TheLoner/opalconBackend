const whitelist = require ('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) =>{
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('not allowed by cors'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions