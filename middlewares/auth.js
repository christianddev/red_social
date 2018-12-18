'use_strict';

const services = require('../services/authService');

function isAuth(req, res, next){
    // console.log('isAuth');
    // console.log('req.headers.authorization :', req.headers.authorization);
    if(!req.headers.authorization){
        return res.status(403).send({message:'No tienes autorización'});
    }
    // Json Web Token -> JWT -> es del tipo Bearer asdasdasdsad
    const token = req.headers.authorization.split(' ')[1];

    services.decodeToken(token)
    .then((response) => {
        req.user = response;
        next();
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })

}

module.exports = isAuth;