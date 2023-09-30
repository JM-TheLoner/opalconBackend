const User = require ('../model/Users')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const handleLogin = async (req,res)=>{
    const { user, pwd } = req.body 
    if (!user || !pwd) return res.status(400).json({"message": 'Enter a Username and a password'})      //confirm they are both there
    const un = await User.findOne({username: user}).exec()   //check for duplicates
    if (!un) return res.sendStatus(401)
    const pd = await bcrypt.compare(pwd, un.password)
    if (pd) {
        const roles = Object.values(un.roles)
        const accessToken = jwt.sign(           //defining the access token
            {"userInfo": { 
                    "username":un.username,
                    "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '18000s'}
        )    
        const refreshToken = jwt.sign(           //defining the refresh token
            {"username":un.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        )    
        un.refreshToken = refreshToken
        const result = await un.save()
        console.log(result)
        res.json(result)
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})   //the math here is trying to calculate one day in milliseconds
        res.json({ accessToken })
    } else{
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }