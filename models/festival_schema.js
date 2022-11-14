const { Schema, model } = require('mongoose');

//Creating the rules for the model
const festivalSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'title field is required']
        },
        description: {
            type: String,
            required: [true, 'description field is required']
        },
        city: {
            type: String,
            required: [true, 'city field is required']
        },
        start_date: {
            type: Date,
            required: [true, 'start date field is required']
        },
        end_date: {
            type: Date,
            required: [true, 'end date field is required']
        },
        image_path: {
            type: String
        }
    },

    { timestamps: true }
);

//All models are singular and start with a capital letter
module.exports = model('Festival', festivalSchema);