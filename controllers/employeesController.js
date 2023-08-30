const Employee = require ('../model/Employee')

const getAllEmployees = async (req, res)=>{
    const employees = await Employee.find()
	if (!employees) return res.status(204).json({'message':'no employees found'})
	res.json(employees)
}

const createNewEmployee = async (req, res)=>{
	if (!req?.body?.firstname || !req?.body?.lastname) {
		return res.status(400).json({'message':'firstname and lastname are required'})
	}

	try{
		const result = await Employee.create({
			firstname : req.body.firstname,
			lastname : req.body.lastname,
            gender: req.body.gender,
            email: req.body.email,
            phone_no: req.body.phone_no
		})
		
			res.status(201).json(result)
	} catch (err){
		console.log(err)
	}
}

const updateEMployee = async (req, res)=>{
    if (!req?.body?.id){
		return res.status(400).json({'message':'ID parameter is required'})
	}
	const employee = await Employee.findOne({ _id: req.body.id}).exec()		
    if (!employee) {
        return res.status(204).send(`the employee: ${req.body.id} doesnt exist`)
    } 
    if (req.body?.firstname) employee.firstname = req.body.firstname
    if (req.body?.lastname) employee.lastname = req.body.lastname
    if (req.body?.gender) employee.gender = req.body.gender
    if (req.body?.email) employee.email = req.body.email
    if (req.body?.phone_no) employee.phone_no = req.body.phone_no
    
    const result = await employee.save()
    res.json(result)
}

const deleteEMployee = async (req, res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({'message':'ID parameter is required'})
    }
    const employee = await Employee.findOne({ _id: req.body.id}).exec()
    if (!employee) {
        return res.status(204).send(`the employee: ${req.body.id} doesnt exist`)
    } 
    const result = await employee.deleteOne()
    res.json(result)
}
 
const getEmployee = async (req, res)=>{
    if (!req?.params?.id) return res.status(400).json({'message':'ID parameter is required'})
    const employee = await Employee.findOne({ _id: req.params.id}).exec()		
    if (!employee) {
        return res.status(204).send(`the employee: ${req.params.id} doesnt exist`)
    }
    res.json(employee)
}

module.exports = { getAllEmployees, getEmployee, updateEMployee, createNewEmployee, deleteEMployee}