'use_strict';

const express = require('express');
router = express.Router();

const auth = require('../middlewares/auth');
const commentController = require('../controllers/commentController');

//POST
    //http://localhost:3000//post/index 
    router.get( '/',   commentController.ShowAll)

    //http://localhost:3000/post/create
    router.post("/create",  commentController.create)

    // //http://localhost:3000//post/update
    // router.put( "/update",  commentController.update)

    //http://localhost:3000//post/delete
    router.delete('/delete',commentController.delete)

module.exports = router