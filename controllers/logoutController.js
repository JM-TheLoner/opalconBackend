const User = require ('../model/Users')

const handleLogout = async (req,res)=>{
    const cookies = req.cookies 
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt
    const un = await User.findOne({refreshToken: refreshToken}).exec()
    if (!un) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})       //the arguments here are the same arguments from when we made the cookie in authController.js
        return res.sendStatus(204)
    }

    un.refreshToken = ""
	const result = await un.save()
	console.log(result)

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})     //secure: true
    res.sendStatus(204)
}

module.exports = { handleLogout }