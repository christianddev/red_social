const express = require('express');
router = express.Router();

const userController = require('../controllers/userController');

//Los datos se envian en el "body" (id´s, ), 
//por URL solo recibe "la ruta"
//USER
    //http://localhost:3000//user/index 
    router.get( '/',   userController.index)

    //http://localhost:3000/user/create
    router.post("/create",  userController.create)

    //http://localhost:3000//user/update
    router.put( "/update",  userController.update)

    //http://localhost:3000//user/delete
    router.delete('/delete',userController.delete)

module.exports = router