const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT ;

const bodyParser = require('body-parser');

const states = require("./src/routes/statesRoute");

app.use(bodyParser.json());

app.use("/states", states);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});