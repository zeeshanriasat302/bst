// routers/testimonialRouter.js

const express = require('express');
const testimonialController = require('../controllers/testimonialscontroller');

const testimonialRouter = express.Router();

testimonialRouter.post('/addtestimonials', testimonialController.addTestimonial);
testimonialRouter.put('/updatetestimonial/:testimonialId', testimonialController.updateTestimonial);
testimonialRouter.get('/alltestimonials', testimonialController.getAllTestimonials);

// Export the router
module.exports = testimonialRouter;
