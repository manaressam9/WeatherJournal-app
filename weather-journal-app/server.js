// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express, body-parser and cors to run server and routes
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port,() => console.log(`running on localhost: ${port}`));
/* Routes */
//Get Route named "getdata" to return data stored in projectData object
app.get('/getdata', (request,response) => { response.send(projectData).status(200).end();});
//Post Route named "savedata" to save data received from the API
app.post('/savedata', (request,response) => {
 projectData= {
     temp: request.body.temp,
     date: request.body.date,
     cont: request.body.cont
 };
 response.send(projectData).status(200).end();
});
