const verifyRoles = (...allowedRoles) =>{
    return (req, res, next) =>{
        if (!req?.roles) return res.sendStatus(401)                               //in case there is no jwt
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)                     //allowed roles
        console.log('-------------------')
        console.log(req.roles) 
        console.log(req.user)                     //roles coming from jwt
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)     //.map creates a new array...'(role' part means for each role we have, we will compare it to the roles array and see if the rolesarray contains it and if it does, it returns true...'.find' gets the first value to say true...{they are 2 higher order functions}
        if (!result) return res.sendStatus(401)
        next()
    }  
}

module.exports = verifyRoles