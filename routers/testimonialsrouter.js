
const express = require('express');
const testimonialController = require('../controllers/testimonialscontroller');
const testimonialRouter = express.Router();
const checkAuth = require("../middleware/auth");

testimonialRouter.post('/addtestimonials', checkAuth(), testimonialController.addTestimonial);
testimonialRouter.put('/updatetestimonial/:testimonialId', checkAuth(), testimonialController.updateTestimonial);
testimonialRouter.get('/alltestimonials', checkAuth(), testimonialController.getAllTestimonials);

module.exports = testimonialRouter;
