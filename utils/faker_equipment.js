/* mySeedScript.js */
// require the necessary libraries
const { faker } = require('@faker-js/faker');
const connect = require("./db");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB3() {
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

        const collection = client.db("PremiumScaffolding").collection("equipment");

        //console.log("im here");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        // collection.drop();

        // make a bunch of time series data
        let timeSeriesData3 = [];

        for (let i = 0; i < 10; i++) {
            let newContract = {
                name: faker.name.firstName() + faker.name.lastName(),
                amount: faker.random.numeric(),
                description: faker.commerce.productDescription(),
                category: faker.commerce.department(),
                equipment_status: faker.random.word(),
                status_id: randomIntFromInterval(1,100),
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

        console.log("Equipment seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }

}

seedDB3();

//Exporting the entire connect function in which I later call and use in the server.js file
// module.exports = seedDB;