
const InsuranceCompany = require('../models/insurance');
const mongoose = require('mongoose');
const { validateInsuranceCreation } = require('../validaters/insurancevalidater');

const insuranceCompanyController = {

    addInsuranceCompany: async (req, res, next) => {
        try {
            const { error, value } = validateInsuranceCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { name, image, createdBy } = value;
            const existingInsuranceCompany = await InsuranceCompany.findOne({ name });
            if (existingInsuranceCompany) {
                return res.status(400).json({ error: 'insuranceCompany already exists' });
            }
            const newInsuranceCompany = new InsuranceCompany({ name, image, createdBy });
            await newInsuranceCompany.save();
            return res.status(201).json({ message: 'Insurance company added successfully', insuranceCompany: newInsuranceCompany });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateInsuranceCompany: async (req, res, next) => {
        try {
            const { insuranceId } = req.params;
            const { error, value } = validateInsuranceCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
                return res.status(400).json({ error: 'Invalid userId format' });
            }
            const existingInsuranceCompany = await InsuranceCompany.findOne({ _id: insuranceId });
            if (!existingInsuranceCompany) {
                return res.status(404).json({ error: 'Insurance company not found' });
            }
            const isInsuranceNameExist = await InsuranceCompany.findOne({
                name: value.name,
                _id: { $ne: insuranceId }
            });
            if (isInsuranceNameExist) {
                return res.status(400).json({ error: 'Insurancecompany already exists with the same name' });
            }
            existingInsuranceCompany.name = value.name;
            existingInsuranceCompany.image = value.image;
            existingInsuranceCompany.updatedBy = value.updatedBy;

            await existingInsuranceCompany.save();
            return res.status(200).json({ message: 'Insurance company details updated successfully', insuranceCompany: existingInsuranceCompany });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllInsuranceCompanies: async (req, res, next) => {
        try {
            const allInsuranceCompanies = await InsuranceCompany.find();
            return res.status(200).json({ message: "insuranceCompanies fetched succesfully", insuranceCompanies: allInsuranceCompanies });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = insuranceCompanyController;
