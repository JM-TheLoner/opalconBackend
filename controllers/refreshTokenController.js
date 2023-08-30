const User = require ('../model/Users')
const jwt = require ('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies 
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    const un = await User.findOne(refreshToken).exec()
    if (!un) return res.sendStatus(403)

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
                { expiresIn: '120s'}
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }