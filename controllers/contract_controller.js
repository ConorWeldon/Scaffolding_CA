const Contract = require('../models/contract_schema.js');
const bcrypt = require('bcryptjs');                                                   //Bcrypt is what is doing my cryptographic hash functions
const jwt = require('jsonwebtoken');                                                  //Jsonwebtoken (jwt) is what is creating my tokens and verifying them

const register = (req, res) => {
    //this is just an object, it hasnt actually created in the database yet
    let newContract = new Contract(req.body);
    //Here im encrypting the password for security protection
    newContract.password = bcrypt.hashSync(req.body.password, 10);

    newContract.save((err, contract) => {
        if(error) {
            return res.status(400).json({
                msg: err
            });
        } else {
            //This is removing the password only in the message sent back as a response
            contract.password = undefined;
            return res.status(201).json(contract);
        }
    });

    //testing the contract return
    //console.log(newContract);
};

const login = (req, res) => {
    Contract.findOne({
        email: req.body.email
    })
    .then((contract) => {
        if (!contract || !contract.comparePassword(req.body.password)) {
            res.status(401).json({
                msg: 'Authentication failed. Invalid contract or password.'
            });
        } else {
            //This is where we generate a token
            let token = jwt.sign({
                email: contract.email,
                first_name: contract.first_name,
                last_name: contract.last_name,
                _id: contract.id
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

const readContractData = (req, res) => {
    Contract.find()
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
    //     "msg": "All contracts retrieved"
    // });
};

const readOne = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve contract with :id
    Contract.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    "message": `Contract with ID: ${id} was not found`
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
    let contractData = req.body;
    // data.id = 1;

    Contract.create(contractData)
        .then((data) => {
            // console.log(data);
            if(data) {
                console.log('New Contract Created!', data);
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
    readContractData,
    readOne,
    createData
};

