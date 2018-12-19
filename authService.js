'use strict';

const config = require('../config/config')
const jwt = require('jwt-simple')
//const jwt = require('jsonwebtoken')
const moment = require('moment')
const bcrypt = require('bcrypt')

function createToken(user) {
    // console.log('createToken');
    const payload = {
        sub: user._id,
        // fecha creación
        iat: moment().unix(),
        // fecha de caducidad
        exp: moment().add(1, 'days').unix()
    }
    // codificar el token con los datos
    return jwt.encode(payload, config.SECRET_TOKEN)
}


function decodeToken(token) {
    // console.log('decodeToken');
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            // comprobar si el token ha expirado
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 400,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        } catch  (err) {
            reject({
                status: 500,
                message: 'Token Invalido',
                err
            })
        }
    })
}

async function comparePass(pass, hash) {
    try {
        // retornar boolean, si el pass enviado coincide con el pass encriptado  
        return await bcrypt.compare(pass, hash);

    } catch (err) {
        return  await res.status(500).send()
    }
}

module.exports = {
    createToken,
    decodeToken,
    comparePass
};

