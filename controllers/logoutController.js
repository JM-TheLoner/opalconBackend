const User = require ('../model/Users')

const handleLogout = async (req,res)=>{
    /*const cookies = req.cookies 
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt*/
  
    const { name } = req.body

    /*cookies were troublesome to work with so i made it take the name instead*/
    
    const un = await User.findOne({username: name}).exec()
    /*i also changed from checking for refresh token to checking for the name*/
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