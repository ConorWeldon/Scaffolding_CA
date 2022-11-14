const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating the rules for the model
const equipmentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
            //Trim removes an unnecessary spaces at the start or end
            trim: true
        },
        amount: {
            type: Number,
            required: [true, 'Amount field is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description field is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category field is required'],
            trim: true
        },
        equipment_status: {
            type: String,
            required: [true, 'Equipment Status field is required'],
            trim: true
        },
        status_id: {
            type: String,
            required: [true, 'status field is required']
        }
    },

    { timestamps: true }
);

//Creating our own model here
//Creating a function
equipmentSchema.methods.comparePassword = function(password){
    //First password is the password that the equipment just put in when logging in
    //Second password (this.password) is the password thats actually in the DB in regards to the email selected
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

//All models are singular and start with a capital letter
module.exports = model('Equipment', equipmentSchema);