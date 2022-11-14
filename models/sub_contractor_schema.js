const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const contractSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'First Name field is required'],
            //Unique makes it to make sure the name is unique
            unique: [true, 'Name already exists, must use a unique name'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description field is required'],
            trim: true
        },
        start_date: {
            type: Date,
            required: [true, 'Date field is required'],
            trim: true
        },
        end_date: {
            type: Date,
            trim: true
        },
        cost: {
            type: Number,
            required: [true, 'Cost field is required']
        },
        contract_id: {
            type: Number,
            required: [true, 'Contract ID field is required'],
            trim: true
        },
        contractor: {
            type: Number,
            required: [true, 'Contract field is required'],
            trim: true
        }
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
contractSchema.methods.comparePassword = function(password){
    //First password is the password that the sub_contractor just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('Sub_Contractor', contractSchema);