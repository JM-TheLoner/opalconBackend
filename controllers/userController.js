const User = require ('../model/Users')
const bcrypt = require ('bcrypt')

const getAllUsers = async (req, res)=>{
    if (!req.body.id){
    const users = await User.find()
	if (!users) return res.status(204).json({'message':'no users found'})
	res.json(users)}
    
    if (req.body.id){
        if (!req?.body?.id) return res.status(400).json({'message':'ID parameter is required'})
        const user = await User.findOne({ _id: req.body.id}).exec()		
        if (!user) {
            return res.status(204).send(`the user: ${req.body.id} doesnt exist`)
        } 
        res.json(user)
    }
}

const updateUser = async (req, res)=>{
    if (!req?.body?.id){
		return res.status(400).json({'message':'ID parameter is required'})
	}

	const user = await User.findOne({ _id: req.body.id}).exec()		
    if (!user) {
        return res.status(204).send(`the user: ${req.body.id} doesnt exist`)
    } 

    if (req.body?.user) user.username = req.body.user

    if (req.body?.pwd) {

        if (!req.body.conf){
            return res.status(400).json({'message':'Please Confirm The Password'})
        }
        if (req.body.pwd !== req.body.conf){
            return res.status(400).json({'message':'Passwords do not match'})
        }
        if (req.body.pwd === req.body.conf){
        const hashedPwd = await bcrypt.hash(req.body.pwd, 10)
        user.password = hashedPwd}
    }
    
    const result = await user.save()
    res.json(result)
}

const deleteUser = async (req, res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({'message':'ID parameter is required'})
    }
    const user = await User.findOne({ _id: req.body.id}).exec()
    if (!user) {
        return res.status(204).send(`the user: ${req.body.id} doesnt exist`)
    } 
    const result = await user.deleteOne()
    res.json(result)
}

const getUser = async (req, res)=>{
    if (!req?.params?.id) return res.status(400).json({'message':'ID parameter is required'})
    const user = await User.findOne({ _id: req.params.id}).exec()		
    if (!user) {
        return res.status(204).send(`the user: ${req.body.id} doesnt exist`)
    } 
    res.json(user)
}

module.exports = { getAllUsers, getUser, updateUser, deleteUser }