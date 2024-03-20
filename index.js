const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 5000 ;

const bodyParser = require('body-parser');

const states = require("./src/routes/statesRoute");
const services = require("./src/routes/servicesRoute");

const teams = require("./src/routes/teamsRoute");

const users = require("./src/routes/usersRoute");


app.use(bodyParser.json());

app.use("/users", users);
app.use("/states", states);
app.use("/teams", teams);
app.use("/services", services);

app.get('/', (req, res) => {
  res.send('BST Backend');
 });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:5000`);
});