const Service = require ('../model/Services')

const getAllServices = async (req, res)=>{
    const services = await Service.find()
	if (!services) return res.status(204).json({'message':'no services found'})
	res.json(services)
}

const createNewService = async (req, res)=>{
	if (!req?.body?.name || !req?.body?.desc) {
		return res.status(400).json({'message':'Service name and description are required'})
	}

	try{
		const result = await Service.create({
			name : req.body.name,
			description : req.body.desc,
            price_range: req.body.price
		})
		
			res.status(201).json(result)
	} catch (err){
		console.log(err)
	}
}

const updateService = async (req, res)=>{
    if (!req?.body?.id){
		return res.status(400).json({'message':'ID parameter is required'})
	}
	const service = await Service.findOne({ _id: req.body.id}).exec()		
    if (!service) {
        return res.status(204).send(`the service with the ID: ${req.body.id} doesnt exist`)
    } 
    if (req.body?.name) service.name = req.body.name
    if (req.body?.desc) service.description = req.body.desc
    if (req.body?.price) service.price_range = req.body.price
    
    const result = await service.save()
    res.json(result)
}

const deleteService = async (req, res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({'message':'ID parameter is required'})
    }
    const service = await Service.findOne({ _id: req.body.id}).exec()
    if (!service) {
        return res.status(204).send(`the service of ID: ${req.body.id} doesnt exist`)
    } 
    const result = await service.deleteOne()
    res.json(result)
}
 
const getService = async (req, res)=>{
    if (!req?.params?.id) return res.status(400).json({'message':'ID parameter is required'})
    const service = await Service.findOne({ _id: req.params.id}).exec()		
    if (!service) {
        return res.status(204).send(`the service: ${req.params.id} doesnt exist`)
    }
    res.json(service)
}

module.exports = { getAllServices, getService, updateService, createNewService, deleteService}