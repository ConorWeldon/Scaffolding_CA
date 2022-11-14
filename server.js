const express = require('express');
const jwt = require('jsonwebtoken');
const seedDB = require('./utils/faker_employees.js');
const seedDB2 = require('./utils/faker_status.js');
const app = express();
const port = 3000;

require('dotenv').config();
require('./utils/db.js')();

//This is built in middleware and its the first middleware that we use
app.use(express.json());              //All routes can accept json below this
app.use(express.static('public'));    // registers the middleware - takes a folder name. Built in express method //Makes the content of public, public

//Middleware that tells me the time
// app.use((req, res, next) => {
//     console.log("Time: ", Date.now());
//     res.setHeader('test', "Hello World");
//     //runs the next middleware in this case is the app.use for Time
//     next();
// });

//Middleware that verifies my tokens
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err, decoded) => {
            if(err) {
                req.employee = undefined;
            }

            //Decoded is the payload that is inside the token
            req.employee = decoded;
            next();
        });
    } else {
        req.employee = undefined;
        //runs the next middleware in this case is the app.use for employees and festivals
        next();
    }
});

//Testing
app.use((req, res, next) => {
    console.log(req.employee);
    next();
});

/*
// 4 Differet Endpoints all leading to the same endpoint
// I used this for testing

// GET http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello World! New');
});
// POST http://localhost:3000/
app.post('/', (req, res) => {
    res.send('This is a post request to /');
});
// PUT http://localhost:3000/
app.put('/', (req, res) => {
    res.send('This is a put request to /');
});
// DELETE http://localhost:3000/
app.delete('/', (req, res) => {
    res.send('This is a delete request to /');
});
*/

//This is called a route middleware
app.use('/api/employees', require('./routes/employee'));
app.use('/api/contract', require('./routes/contract'));
app.use('/api/company', require('./routes/company'));
app.use('/api/emergencyContact', require('./routes/emergency_contact'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/status', require('./routes/status'));
// app.use('/api/subContractor', require('./routes/sub_contractor'));
app.use('/api/festivals', require('./routes/festivals'));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


