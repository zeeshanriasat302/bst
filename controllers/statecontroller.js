
const State = require('../models/state');
const TeamMember = require('../models/team');
const Service = require('../models/services');
const InsuranceCompany = require('../models/insurance');
const Testimonial = require('../models/testimonials');


const mongoose = require('mongoose');
const { validateStateCreation } = require('../validaters/statevalidater');
const TeamMemberState = require('../models/teamstate');
const ServiceState = require('../models/servicestate');
const InsuranceState = require('../models/insurancestate');
const TestimonialState = require('../models/testimonialstate');

const StateController = {
    addState: async (req, res, next) => {
        try {
            const { error, value } = validateStateCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            const { name, email, phone, logo_url, initial_pricing, regular_pricing, brief_pricing, team, services, insurance, testimonials } = value
            const createdBy = req.user._id;
            const existingState = await State.findOne({ name });
            if (existingState) {
                return res.status(400).json({ message: 'State already exists' });
            }
            const newState = new State({ name, createdBy, email, phone, logo_url, initial_pricing, regular_pricing, brief_pricing });
            await newState.save();
            const teamStateArray = []
            const addedTeamMemberIds = new Set();
            for (let member of team) {
                if (addedTeamMemberIds.has(member)) {
                    return res.status(400).json({ error: `Duplicate team member ID '${member}' found` });
                }
                addedTeamMemberIds.add(member);
                const foundMember = await TeamMember.findById(member);
                if (!foundMember) {
                    res.status(404).json({ message: `memeber not found with id ${member}` });
                    return;
                }
                const teamMemberState = {
                    state: newState._id,
                    teamMember: foundMember._id,
                    teamMemberName: foundMember.name
                }
                teamStateArray.push(teamMemberState);
            }
            const teamMembers = await TeamMemberState.insertMany(teamStateArray)
            //services
            const serviceStateArray = [];
            const addedServiceIds = new Set();
            for (let serviceId of services) {
                if (addedServiceIds.has(serviceId)) {
                    return res.status(400).json({ error: `Duplicate service ID '${serviceId}' found` });
                }
                addedServiceIds.add(serviceId);

                const foundService = await Service.findById(serviceId);
                if (!foundService) {
                    res.status(404).json({ message: `Service not found with id ${serviceId}` });
                    return;
                }
                const serviceState = {
                    state: newState._id,
                    service: foundService._id,
                    serviceName: foundService.name
                };
                serviceStateArray.push(serviceState);
            }
            const serviceStates = await ServiceState.insertMany(serviceStateArray);
            // Adding insurance
            const insuranceStateArray = [];
            const addedInsuranceIds = new Set();
            for (let insuranceId of insurance) {
                if (addedInsuranceIds.has(insuranceId)) {
                    return res.status(400).json({ error: `Duplicate insurance ID '${insuranceId}' found` });
                }

                const foundInsurance = await InsuranceCompany.findById(insuranceId);
                if (!foundInsurance) {
                    res.status(404).json({ message: `Insurance company not found with id ${insuranceId}` });
                    return;
                }
                const insuranceState = {
                    state: newState._id,
                    insuranceCompany: foundInsurance._id,
                    insuranceCompanyName: foundInsurance.name
                };
                insuranceStateArray.push(insuranceState);
                addedInsuranceIds.add(insuranceId);
            }
            const insuranceStates = await InsuranceState.insertMany(insuranceStateArray);
            const testimonialArray = [];
            const addedTestimonialIds = new Set();
            for (let testimonialId of testimonials) {
                if (addedTestimonialIds.has(testimonialId)) {

                    return res.status(400).json({ error: `Duplicate testimonial ID '${testimonialId}' found` });
                }
                const foundTestimonial = await Testimonial.findById(testimonialId);
                console.log(foundTestimonial)
                if (!foundTestimonial) {
                    res.status(404).json({ message: `Testimonial not found with id ${testimonialId}` });
                    return;
                }
                const testimonialState = {
                    state: newState._id,
                    Testimonial: foundTestimonial._id,
                    name: foundTestimonial.name
                };
                addedTestimonialIds.add(testimonialId);
                testimonialArray.push(testimonialState);
            }

            const testimonialStates = await TestimonialState.insertMany(testimonialArray);

            return res.status(201).json({ message: 'State added successfully', state: newState, teamMembers: teamMembers, serviceStates: serviceStates, insuranceStates: insuranceStates, testimonialStates: testimonialStates });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateStateDetails: async (req, res, next) => {
        try {
            const { stateId } = req.params;
            const { error, value } = validateStateCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            if (!mongoose.Types.ObjectId.isValid(stateId)) {
                return res.status(400).json({ error: 'Invalid userId format' });
            }
            const existingState = await State.findOne({
                _id: stateId
            });
            if (!existingState) {
                return res.status(404).json({ error: 'State not found' });
            }
            const isStateNameExist = await State.findOne({
                name: value.name,
                _id: { $ne: stateId }
            });
            if (isStateNameExist) {
                return res.status(400).json({ error: 'State already exists with the same name' });
            }
            const { name, email, phone, logo_url, initial_pricing, regular_pricing, brief_pricing, team, services, insurance, testimonials } = value;
            existingState.name = name;
            existingState.email = email;
            existingState.phone = phone;
            existingState.updatedBy = req.user._id;
            existingState.logo_url = logo_url;
            existingState.initial_pricing = initial_pricing;
            existingState.regular_pricing = regular_pricing;
            existingState.brief_pricing = brief_pricing

            const teamStateArray = [];
            const addedTeamMemberIds = new Set();
            for (let member of team) {
                if (addedTeamMemberIds.has(member)) {
                    return res.status(400).json({ message: `Duplicate team member ID '${member}' found` });
                }
                const foundMember = await TeamMember.findById(member);

                if (!foundMember) {
                    res.status(404).json({ message: `Member not found with id ${member}` });
                    return;
                }
                const teamMemberState = {
                    state: existingState._id,
                    teamMember: foundMember._id,
                    teamMemberName: foundMember.name
                }
                teamStateArray.push(teamMemberState);
                addedTeamMemberIds.add(member);
            }

            await TeamMemberState.deleteMany({ state: existingState._id });

            const updatedTeamMembers = await TeamMemberState.insertMany(teamStateArray);
            const serviceStateArray = [];
            const addedServiceIds = new Set();
            for (let serviceId of services) {
                if (addedServiceIds.has(serviceId)) {
                    return res.status(400).json({ message: `Duplicate service ID '${serviceId}' found` });
                }
                const foundService = await Service.findById(serviceId);
                if (!foundService) {
                    res.status(404).json({ message: `Service not found with id ${serviceId}` });
                    return;
                }
                const serviceState = {
                    state: existingState._id,
                    service: foundService._id,
                    serviceName: foundService.name
                };
                serviceStateArray.push(serviceState);
                addedServiceIds.add(serviceId);
            }
            await ServiceState.deleteMany({ state: existingState._id });
            const updatedServiceStates = await ServiceState.insertMany(serviceStateArray);
            const insuranceStateArray = [];
            const addedInsuranceIds = new Set();
            for (let insuranceId of insurance) {
                if (addedInsuranceIds.has(insuranceId)) {
                    return res.status(400).json({ message: `Duplicate insurance ID '${insuranceId}' found` });
                }
                const foundInsurance = await InsuranceCompany.findById(insuranceId);
                if (!foundInsurance) {
                    res.status(404).json({ message: `Insurance company not found with id ${insuranceId}` });
                    return;
                }
                const insuranceState = {
                    state: existingState._id,
                    insuranceCompany: foundInsurance._id,
                    insuranceCompanyName: foundInsurance.name
                };
                insuranceStateArray.push(insuranceState);
                addedInsuranceIds.add(insuranceId);
            }
            await InsuranceState.deleteMany({ state: existingState._id });
            const updatedInsuranceStates = await InsuranceState.insertMany(insuranceStateArray);

            const testimonialStateArray = [];
            const addedTestimonialIds = new Set();
            for (let testimonialId of testimonials) {
                if (addedTestimonialIds.has(testimonialId)) {
                    return res.status(400).json({ message: `Duplicate testimonial ID '${testimonialId}' found` });
                }
                const foundTestimonial = await Testimonial.findById(testimonialId);
                if (!foundTestimonial) {
                    res.status(404).json({ message: `Testimonial not found with id ${testimonialId}` });
                    return;
                }
                const testimonialState = {
                    state: existingState._id,
                    Testimonial: foundTestimonial._id,
                    name: foundTestimonial.name
                };
                testimonialStateArray.push(testimonialState);
                addedTestimonialIds.add(testimonialId);
            }
            await TestimonialState.deleteMany({ state: existingState._id });
            const updatedTestimonialStates = await TestimonialState.insertMany(testimonialStateArray);
            await existingState.save();
            return res.status(200).json({
                message: 'State details updated successfully',
                state: existingState,
                updatedTeamMembers,
                updatedServiceStates,
                updatedInsuranceStates,
                updatedTestimonialStates
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllStates: async (req, res) => {
        try {
            const allStates = await State.find().select('name , _id');
            return res.status(200).json({ message: "States fetched succesfully", states: allStates });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllDataByStateId: async (req, res) => {
        try {
            const { stateId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(stateId)) {
                return res.status(400).json({ error: 'Invalid state ID format' });
            }

            const state = await State.findById(stateId);
            if (!state) {
                return res.status(404).json({ message: 'State not found' });
            }

            const teamMembers = await TeamMemberState.find({ state: stateId }).populate('teamMember');
            const services = await ServiceState.find({ state: stateId }).populate('service');
            const insurance = await InsuranceState.find({ state: stateId }).populate('insuranceCompany');
            const testimonials = await TestimonialState.find({ state: stateId }).populate('Testimonial');

            return res.status(200).json({
                message: 'Data fetched successfully',
                state,
                teamMembers,
                services,
                insurance,
                testimonials
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

};

module.exports = StateController;





