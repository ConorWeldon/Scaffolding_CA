const express = require('express');
const { loginRequired, accessRequired } = require('../controllers/auth_controllers');
const router = express.Router();

//Middleware for uploading and getting images
const multer = require('multer');
const upload = multer({dest: 'public/uploads/' });

//Calling in the middleware I created that I'm adding onto the multer middleware
const imageUpload = require('../utils/image_upload');

// import employee_controller. curly braces is where you specify what ur importing
const { register,
    login,
    readEmployeeData,
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/employee_controller');

// takes the function from the controller in the employee_controller files
// router.get('/', readData);
// router.get('/:id', readOne);
// router.post('/', createData);
// router.put('/:id', updateData);
// router.delete('/:id', deleteData);

//We are using post method because we are sending form data
router
    .get('/', readEmployeeData)
    .get('/:id', accessRequired, readOne)
    .post('/', imageUpload.single('image'), createData)
    .put('/:id', imageUpload.single('image'), updateData)
    .delete('/:id', deleteData)
    .post('/register', register)
    .post('/login', login)

module.exports = router;
