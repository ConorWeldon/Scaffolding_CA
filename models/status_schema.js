const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const statusSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'First Name field is required'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        notes: {
            type: String,
            required: [true, 'Notes field is required'],
            trim: true
        },
        image_path: {
            type: String
        },
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
statusSchema.methods.comparePassword = function(password){
    //First password is the password that the status just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('Status', statusSchema);