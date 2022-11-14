const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const contractSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'First Name field is required'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Second Name field is required'],
            trim: true
        },
        start_date: {
            type: String,
            required: [true, 'Second Name field is required'],
            trim: true
        },
        end_date: {
            type: String,
            required: [true, 'Email field is required'],
            unique: [true, 'Email already exists, must use a new email'],
            lowercase: true,
            trim: true
        },
        cost: {
            type: String,
            required: [true, 'password field is required']
        },
        contact_id: {
            type: Number,
            required: [true, 'Mobile number field is required'],
            trim: true
        },
        contractor: {
            type: Number,
            required: [true, 'Emergancy contact field is required'],
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