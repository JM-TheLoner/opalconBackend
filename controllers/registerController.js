const User = require ('../model/Users')
const bcrypt = require ('bcrypt')

const handleNewUser = async (req, res) =>{
    const { user, pwd } = req.body          //separate username from password
    if (!user || !pwd ) return res.status(400).json({"message": 'username and password required'})     //confirm they are both there
    const duplicate = await User.findOne({username: user}).exec()	    //check for duplicates
    if (duplicate) return res.sendStatus(409)
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10)    //to encrypt the password
        const newUser = {                    //to make the new user
            "username":user,
            "roles":{
                "User":1000
            },
         "password":hashedPwd,
        }
        const result = await User.create({
            "username":user,
            "password":hashedPwd
        })
    
        console.log(result)
    } catch (err){
        res.status(500).json({"message": err.message})      //in case of error
    }
}

module.exports = { handleNewUser }