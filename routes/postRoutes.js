'use_strict';

const express = require('express');
router = express.Router();

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

//POST
    //http://localhost:3000//post/index 
    router.get( '/',  auth, postController.ShowAll)

    //http://localhost:3000/post/create
    router.post("/create",  auth, postController.create)

    //http://localhost:3000//post/update
    router.put( "/update",  auth, postController.update)

    //http://localhost:3000//post/delete
    router.delete('/delete', auth,postController.delete)

module.exports = router