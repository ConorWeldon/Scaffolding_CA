const Festival = require('../models/festival_schema.js');

const readData = (req, res) => {
    Festival.find()
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
    //     "msg": "All festivals retrieved"
    // });
};

const readOne = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve festival with :id
    Festival.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    "message": `Festival with ID: ${id} was not found`
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
    let festivalData = req.body;
    // data.id = 1;

    Festival.create(festivalData)
        .then((data) => {
            // console.log(data);
            if(data) {
                console.log('New Festival Created!', data);
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

    // connect to DB, check if email exists. If yes, respond with error
    // if some festival info is missing, respond with error

    // otherwise respond with all good
    // 201 is basically everything is fine, and here's the festival you added

    // if (data.password.length < 6) {
    //     res.status(422).json({
    //         "msg": "festival password must be above 6 characters"
    //     });
    // } else {
    //     res.status(201).json({
    //         "msg": "All good",
    //         "data": data
    //     });
    // }

};

const updateData = (req, res) => {

    let id = req.params.id;
    let data = req.body;
    data.id = id;

    res.status(200).json({
        "msg": `You edited festival with ID ${id}`,
        "data": data
    });
};

const deleteData = (req, res) => {

    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve festival with :id
    res.status(200).json({
        "msg": `You deleted festival with id ${id}`
    });
};

module.exports = {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};

