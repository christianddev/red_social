const express = require('express');
router = express.Router();

const wallController = require('../controllers/wallController');

//Los datos se envian en el "body" (id´s, ), por URL solo recibe "la ruta"

//WALL
    router.get('/',wallController.showWallUser);                        //  Wall del mes actual para un usuario
    router.post('/create',wallController.createWallUser);               //  Crea un nuevo Wall // por defecto al dar de alta un user (inclye post de bienvenida), o de forma automatica en ua fecha determinada
    //router.put('/commentUpdate',wallController.updateWallComment);  //  actualiza wall, para incluir un nuevo comentario en un post 
    router.put('/postUpdate',wallController.updateWallPost);        //  actualiza wall, un nuevo post
    router.delete('/postDelete',wallController.removePost);        //  actualiza wall, borra un post
    router.delete('/delete',wallController.deleteWall);             //  Borra el wal (cambia el deleted = true)

module.exports = router