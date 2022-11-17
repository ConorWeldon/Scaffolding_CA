const express = require('express');
const { loginRequired } = require('../controllers/auth_controllers');
const router = express.Router();

// import status_controller. curly braces is where you specify what ur importing
const { register,
    login,
    readStatusData,
    readOne,
    createData
} = require('../controllers/status_controller');

// takes the function from the controller in the status_controller files
// router.get('/', readData);
// router.get('/:id', readOne);
// router.post('/', createData);
// router.put('/:id', updateData);
// router.delete('/:id', deleteData);

//We are using post method because we are sending form data
router
    .get('/', readStatusData)
    .get('/:id', readOne)
    .post('/', createData)
    .post('/register', register)
    .post('/login', login)

module.exports = router;
