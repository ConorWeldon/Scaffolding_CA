const Status = require('../models/status_schema.js');
const bcrypt = require('bcryptjs');                                                   //Bcrypt is what is doing my cryptographic hash functions
const jwt = require('jsonwebtoken');                                                  //Jsonwebtoken (jwt) is what is creating my tokens and verifying them

const register = (req, res) => {
    //this is just an object, it hasnt actually created in the database yet
    let newStatus = new Status(req.body);
    //Here im encrypting the password for security protection
    newStatus.password = bcrypt.hashSync(req.body.password, 10);

    newStatus.save((err, status) => {
        if(error) {
            return res.status(400).json({
                msg: err
            });
        } else {
            //This is removing the password only in the message sent back as a response
            status.password = undefined;
            return res.status(201).json(status);
        }
    });

    //testing the status return
    //console.log(newStatus);
};

const login = (req, res) => {
    Status.findOne({
        email: req.body.email
    })
    .then((status) => {
        if (!status || !status.comparePassword(req.body.password)) {
            res.status(401).json({
                msg: 'Authentication failed. Invalid status or password.'
            });
        } else {
            //This is where we generate a token
            let token = jwt.sign({
                email: status.email,
                first_name: status.first_name,
                last_name: status.last_name,
                _id: status.id
            }, process.env.APP_KEY);

            res.status(200).json({
                msg: 'All good!',
                token
            });
        }
    })
    .catch((err) => {
        //res.status()
        throw err;
    })
};

const readStatusData = (req, res) => {
    Status.find()
        .then((data) => {
            console.log(data);
            if(data.length > 0){
                //this would end the middleware in request (if successful of course)
                res.status(200).json(data);
            } else {
                //400 means its an error on there end
                res.status(404).json("None found");
            }
        })
        .catch((error) => {
            console.log(error);
            //500 means its a server error
            res.status(500).json(error);
        });

    // res.status(200).json({
    //     "msg": "All statuss retrieved"
    // });
};

const readOne = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve status with :id
    Status.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    "message": `Status with ID: ${id} was not found`
                });
            }
            // res.status(200).json({
            //     "message": "success",
            //     "data": data
            // });
        })

        // error handling 
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(404).json({
                    "message": `Bad Request. ${id} is not a valid ID`
                });
            }

            else {
                res.status(500).json(err)
            }

        })
};

const createData = (req, res) => {
    console.log(req.body);
    let statusData = req.body;
    // data.id = 1;

    Status.create(statusData)
        .then((data) => {
            // console.log(data);
            if(data) {
                console.log('New Status Created!', data);
                // data.password = ""; say you want to hide some information from the database youre creating you can do it like this
                //201 means youve succesfully created a new resource and what you need to send back is that resource
                res.status(201).json(data);
            } else {
                //400 means its an error on there end
                res.status(404).json("None found");
            }
        })
        .catch((error) => {
            if(error.name === 'ValidationError') {
                console.error('Validation Error!!', error);
                //422 means unprocessable entity
                res.status(422).json(error);
            } else {
                console.error(error);
                //500 means its a server error
                res.status(500).json(error);
            }
        });

};


module.exports = {
    register,
    login,
    readStatusData,
    readOne,
    createData
};

