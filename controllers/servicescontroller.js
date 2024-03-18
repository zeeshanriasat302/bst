const Service = require('../models/services');
const mongoose = require('mongoose');
const { validateServicesCreation } = require('../validaters/servicesvalidater');
const servicesController = {

    addService: async (req, res) => {
        try {
            const { error, value } = validateServicesCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            const existingService = await Service.findOne({ name: value.name });
            if (existingService) {
                return res.status(400).json({ error: 'Service with this name already exists' });
            }
            const createdBy = req.user._id;
            const newService = new Service({ name: value.name, createdBy });
            await newService.save();
            return res.status(201).json({ message: 'Service added successfully', service: newService });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateService: async (req, res) => {
        try {
            const { serviceId } = req.params;
            const { error, value } = validateServicesCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                return res.status(400).json({ error: 'Invalid userId format' });
            }
            const existingService = await Service.findOne({ _id: serviceId });
            if (!existingService) {
                return res.status(404).json({ error: 'Service not found' });
            }
            const isServicesNameExist = await Service.findOne({
                name: value.name,
                _id: { $ne: serviceId }
            });
            if (isServicesNameExist) {
                return res.status(400).json({ error: 'Services already exists with the same name' });
            }
            existingService.name = value.name;
            existingService.updatedBy = req.user._id;
            await existingService.save();
            return res.status(200).json({ message: 'Service details updated successfully', service: existingService });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllServices: async (req, res) => {
        try {
            const allServices = await Service.find();
            return res.status(200).json({ message: "Services fetched succesfully", services: allServices });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = servicesController;




