const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const emergencyContactSchema = Schema(
    {
        first_name: {
            type: String,
            required: [true, 'First Name field is required'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        last_name: {
            type: String,
            required: [true, 'Second Name field is required'],
            trim: true
        },
        mobile_number: {
            type: Number,
            required: [true, 'Mobile number field is required'],
            trim: true
        }
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
emergencyContactSchema.methods.comparePassword = function(password){
    //First password is the password that the Emergency Contact just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('EmergencyContact', emergencyContactSchema);