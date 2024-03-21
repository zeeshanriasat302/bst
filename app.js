const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
const cors = require('cors');
const connectDb = require('./config/connectdb');
const adminrouter = require('./routers/adminrouter');
const stateRouter = require('./routers/staterouter');
const servicesRouter = require('./routers/servicesrouter');
const teamMemberRouter = require('./routers/teamrouter');
const insuranceCompanyRouter = require('./routers/insurancerouter');
const testimonialRouter = require('./routers/testimonialsrouter');

app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminrouter);
app.use('/state', stateRouter);
app.use('/service', servicesRouter);
app.use('/team', teamMemberRouter);
app.use('/insurance', insuranceCompanyRouter);
app.use('/testimonial', testimonialRouter);

app.get('/', (req, res) => {
    res.send('BST Backend');
});

const DATABASE_URL = process.env.DATABASE_URL
connectDb(DATABASE_URL)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});