require('../config/connection.js')
const schema = require('../models/userSchema')
const User = schema.User

let userController = {
    index: (req, res) => {
        res.status(200).send('userController.index') ;  //Info. por defecto (listado,home..)
    },

    create: (req, res) => {
        res.status(200).send('userController.create') ; //Registro new user
    },

    delete: (req, res) => {
        res.status(200).send('userController.delete') ; //Delete user
    },

    update: (req, res) => {
        res.status(200).send('userController.update') ; //Update datos user, mod.  group
    }
}

module.exports = userController