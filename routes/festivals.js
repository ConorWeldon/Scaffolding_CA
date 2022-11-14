const express = require('express');
const router = express.Router();
const { loginRequired } = require('../controllers/auth_controllers.js');

// import festival_controller. curly braces is where you specify what ur importing
const { readData,
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/festival_controller');

// takes the function from the controller in the festival_controller files
router.get('/', readData);
router.get('/:id', loginRequired, readOne);
router.post('/', loginRequired, createData);
router.put('/:id', loginRequired, updateData);
router.delete('/:id', loginRequired, deleteData);

module.exports = router;
