/* mySeedScript.js */
// require the necessary libraries
const { faker } = require('@faker-js/faker');
const connect = require("./db");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB6() {
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
        console.log("Attempting to seed Equipment");

        const collection = client.db("PremiumScaffolding").collection("companies");

        //console.log("im here");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        // collection.drop();

        // make a bunch of time series data
        let timeSeriesData3 = [];

        for (let i = 0; i < 10; i++) {
            const name = faker.company.name();
            let newContract = {
                name: name,
                email: faker.internet.email(name),
                password: faker.internet.password(),
                mobile_number: faker.phone.number(),
                office_contact: faker.phone.number(),
                location: faker.address.streetAddress(),
                timestamp_day: faker.date.past(),
                // owner: {
                //     email: faker.internet.email(first_name, last_name),
                //     first_name,
                //     last_name,
                // },
                // events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
            }
            timeSeriesData3.push(newContract);
        }
        collection.insertMany(timeSeriesData3);

        console.log("Companies seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }

}

seedDB6();

//Exporting the entire connect function in which I later call and use in the server.js file
// module.exports = seedDB;