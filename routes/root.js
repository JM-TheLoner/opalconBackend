const express = require('express')
const router = express.Router()
const path = require ('path')

router.get('^/$|/index(.html)?', (req, res)=>{                            //This means either the route is /index.html or it is any route that begins with (^) and ends with ($) a slash and the (.html)? means that it isnt necessary for the route to work
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))       //or we can just use the path.join( method)
})

module.exports = router