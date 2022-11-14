const Employee = require('../models/employee_schema.js');
const bcrypt = require('bcryptjs');                                                   //Bcrypt is what is doing my cryptographic hash functions
const jwt = require('jsonwebtoken');                                                  //Jsonwebtoken (jwt) is what is creating my tokens and verifying them
// const { update } = require('../models/employee_schema.js');

//Used to access mogo history for our old data
const fs = require('fs');

const deleteImage = (filename) => {
    //Setting the path I want to delete
    let path = `public${process.env.STATIC_FILES_URL}${filename}`;
    //F_OK accesses it and checks for permissions F Checking if a file exists R W X Read Write Execute
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        //Unlink a syncracly removes a file / symbolic link
        fs.unlink(path, () => {
            if (err) {
                throw err;
            }

            console.log(`${filename} was deleted`)
        });
    });

};

const register = (req, res) => {
    //this is just an object, it hasnt actually created in the database yet
    let newEmployee = new Employee(req.body);
    //Here im encrypting the password for security protection
    newEmployee.password = bcrypt.hashSync(req.body.password, 10);

    newEmployee.save((err, employee) => {
        if(err) {
            return res.status(400).json({
                msg: err
            });
        } else {
            //This is removing the password only in the message sent back as a response
            employee.password = undefined;
            return res.status(201).json(employee);
        }
    });

    //testing the employee return
    console.log(newEmployee);
};

const login = (req, res) => {
    Employee.findOne({
        email: req.body.email
    })
    .then((employee) => {
        if (!employee || !employee.comparePassword(req.body.password)) {
            res.status(401).json({
                msg: 'Authentication failed. Invalid employee or password.'
            });
        } else {
            //This is where we generate a token
            let token = jwt.sign({
                email: employee.email,
                first_name: employee.first_name,
                last_name: employee.last_name,
                _id: employee.id
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

const readEmployeeData = (req, res) => {
    Employee.find()
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
    //     "msg": "All employees retrieved"
    // });
};

const readOne = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve employee with :id
    Employee.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    "message": `Employee with ID: ${id} was not found`
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
    let employeeData = req.body;
    // data.id = 1;

    Employee.create(employeeData)
        .then((data) => {
            // console.log(data);
            if(data) {
                console.log('New Employee Created!', data);
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

const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let file = req.file;

    if (file) {
        body.image_path = file.filename;
    }

    Employee.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {
            
            if(data){
                //Delete old image
                deleteImage(data.image_path);

                res.status(201).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Employee with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });
};

const deleteData = (req, res) => {

    let id = req.params.id;
    let imagePath = '';

    Employee.findById(id)
        .then((data) => {
            //If it finds data do this
            if (data) {
                imagePath =  data.image_path;
                //Since we are returning, the then method stops
                return data.remove();
            } 
            //Otherwise do this
            else {
                //Responds if the employee was not found
                res.status(404).json({
                     "message": `Employee with id: ${id} not found`
                });
            }
        })
        .then (() => {
            console.log("Employee successfully removed!");

            //Now I will delete the Image using the function i created at the top
            deleteImage(imagePath);

            res.status(200).json({
                "message": `Employee with id: ${id} deleted successfully`
            });
        })
        //Catch catches any issues in regards to connecting to the DB and so on
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            } 
        });
};

module.exports = {
    register,
    login,
    readEmployeeData,
    readOne,
    createData,
    updateData,
    deleteData
};

