const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const employeeSchema = Schema(
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
        dob: {
            type: String,
            required: [true, 'Second Name field is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            unique: [true, 'Email already exists, must use a new email'],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'password field is required']
        },
        mobile_number: {
            type: Number,
            required: [true, 'Mobile number field is required'],
            trim: true
        },
        emergancy_contact: {
            type: Number,
            required: [true, 'Emergancy contact field is required'],
            trim: true
        },
        role: {
            type: String,
            trim: true
        },
        access_level: {
            type: String,
            trim: true
        },
        garda_vetting: {
            type: String
        }
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
employeeSchema.methods.comparePassword = function(password){
    //First password is the password that the employee just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('Employee', employeeSchema);