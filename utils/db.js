const mongoose = require('mongoose');

//Url to connect to my database on mongo atlas
// const url = 'mongodb+srv://admin:<password>@cluster0.7lb0krx.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
    let db = null;

    try {
        await mongoose.connect(process.env.DB_ATLAS_URL, {
            useNewUrlParser: true,                  //No longer necessary
            useUnifiedTopology: true                //No longer necessary
        });

        console.log("Connected successfully to DB");
        db = mongoose.connection;
    }
    //Catch catches any errors that may occur during the process and then displays it with console.log
    catch(error) {
        console.log(error);
    }
    //this will run whether an error is caught or not, it runs after the catch
    finally {
        if(db !== null && db.readyState === 1) {
            //await db.close();
            //Testing to show that I succesfully disconnected
            //console.log("Disconnected successfully from DB");
        }
    }
};

//Exporting the entire connect function in which I later call and use in the server.js file
module.exports = connect;