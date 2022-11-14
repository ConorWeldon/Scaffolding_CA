const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const contractSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description field is required'],
            trim: true
        },
        start_date: {
            type: String,
            required: [true, 'Start Date field is required'],
            trim: true
        },
        end_date: {
            type: String,
            trim: true
        },
        cost: {
            type: String,
            required: [true, 'Cost field is required']
        },
        contact_id: {
            type: Number,
            required: [true, 'Contact id field is required'],
            trim: true
        },
        contractor: {
            type: Number,
            required: [true, 'Contractor field is required'],
            trim: true
        }
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
contractSchema.methods.comparePassword = function(password){
    //First password is the password that the contract just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('Contract', contractSchema);