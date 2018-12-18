'use_strict';

const express = require('express');
router = express.Router();

const postController = require('../controllers/postController');

//POST
    //http://localhost:3000//post/index 
    router.get( '/',   postController.ShowAll)

    //http://localhost:3000/post/create
    router.post("/create",  postController.create)

    //http://localhost:3000//post/update
    router.put( "/update",  postController.update)

    //http://localhost:3000//post/delete
    router.delete('/delete',postController.delete)

module.exports = router