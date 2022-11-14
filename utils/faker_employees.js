/* mySeedScript.js */
// require the necessary libraries
const { faker } = require('@faker-js/faker');
const connect = require("./db");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    // require('dotenv').config();
    // require('./db.js')();

    const uri = "mongodb+srv://admin:3l3i2fQgGSZAU9KU@cluster0.7lb0krx.mongodb.net/PremiumScaffolding?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        //await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("PremiumScaffolding").collection("employees");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        //collection.drop();

        // console.log(faker.name.lastName(""));

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 10; i++) {
            const first_name = faker.name.firstName();
            const last_name = faker.name.lastName();
            let newEmployee = {
                first_name: first_name,
                last_name: last_name,
                dob: faker.date.birthdate(),
                email: faker.internet.email(first_name, last_name),
                password: faker.internet.password(),
                mobile_number: faker.phone.number(),
                emergancy_contact: {
                    first_name,
                    last_name,
                    email: faker.internet.email(first_name, last_name),
                    emergency_contact: faker.phone.number(),
                },
                role: faker.name.jobDescriptor(),
                access_level: randomIntFromInterval(1,10),
                timestamp_day: faker.date.past(),
                // emergancy_contacts: {
                //     first_name,
                //     last_name,
                //     email: faker.internet.email(first_name, last_name),
                // },
                // events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
            }
            timeSeriesData.push(newEmployee);
        }
        collection.insertMany(timeSeriesData);

        console.log("Employee seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }

}

seedDB();

//Exporting the entire connect function in which I later call and use in the server.js file
// module.exports = seedDB;