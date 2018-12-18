'use_strict';
const express = require('express');
router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');


//USER

    // router.get( '/',  auth , userController.index)
    // router.post("/create",auth, userController.create)
    router.put( "/update", auth, userController.udpate)
    router.post( "/logIn", userController.logIn)
    router.post( "/signUp",  userController.signUp)
    // router.delete('/delete',auth, userController.delete)

module.exports = router