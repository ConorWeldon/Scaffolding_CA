const multer = require('multer');
const path = require('path')

const fileFilter = (req, file, cb) => {
    console.log(`Filename: ${file.path}`);
    console.log(`Filename: ${file.originalname.match(/\.(jpg | jpeg | png | gif)$/)}`);

    //Here I say if there is no file OR if there is no file that matches the file types I accept below
    if (!file) {
        req.imageError = "Only image files are accepted";
        return cb(null, false);
    } 
    else if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        //First half is where we tell multer to throw an error second part (false) tells it not to move on to the next step / middleware
        req.imageError = "The image attempted to upload isnt an accepted format (jpg, jpeg, png, gif)";
        return cb(null, false);
    }

    cb(null, true);
};

const storage = multer.diskStorage({
    //Destination of where the file goes
    destination: (req, file, cb) => {
        cb(null, 'public' + process.env.STATIC_FILES_URL);
    },
    filename: (req, file, cb) => {
        //These 2 console.logs are used for testing
        console.log(`Filename: ${file.path}`);
        console.log(file.originalname);

        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ fileFilter, storage });