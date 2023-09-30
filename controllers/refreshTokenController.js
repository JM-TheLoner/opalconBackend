const User = require ('../model/Users')
const jwt = require ('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    /*const cookies = req.cookies 
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt*/
  
    const {name} = req.body
    /*cookies were troublesome to work with so i made it take the name instead*/
    
    const un = await User.findOne({username:name}).exec()
    /*i also changed from checking for refresh token to checking for the name*/
    if (!un) return res.sendStatus(403)
  
    const refreshToken = un.refreshToken

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) =>{
            if (err || un.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(un.roles)
            const accessToken = jwt.sign(
                {"userInfo": {
                    "username":un.username,
                    "roles" : roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '18000s'}
            )
            res.json(accessToken)
        }
    )
}

module.exports = { handleRefreshToken }