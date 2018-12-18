const express = require('express');
router = express.Router();

//Los datos se envian en el "body" (id´s, ), por URL solo recibe "la ruta"

//HOME
    router.get('/',(req, res)=>{
        res.status(200).send('login RedSocial')
    });

module.exports = router