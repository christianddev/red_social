'use strict';
//mdoule.exports = ...
const User = require("../models/userSchema");
const service = require("../services/authService");

const ObjectId = require("mongodb").ObjectID;

const userController = {
   
    udpate: (req, res) => {
        let ID = ObjectId(req.body.perfil._id);

        const userReq = {
        perfil: {
            name: req.body.perfil.name,
            email: req.body.perfil.email,
            //password: req.body.perfil.password
        },
        groups: req.body.groups,
        blocked: req.body.blocked
        };

        // console.log("userReq update :", userReq);

        User.update(
        {
            _id: ID
        },
        {
            $set: {
            "perfil.name": req.body.perfil.name,
            "perfil.email": req.body.perfil.email,
            "perfil.password": req.body.perfil.password,
            groups: req.body.groups,
            blocked: req.body.blocked
            }
        }
        )
        .then(result => {
            res.status(200).json(result);
            // console.log('result :', result);
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
    },

    signIn: (req, res) => {
        const user = new User({
            perfil: {
                name: req.body.perfil.name,
                email: req.body.perfil.email,
                password: req.body.perfil.password
            }
        });
        // console.log("req.body.perfil.email :", req.body.perfil.email);
        User.findOne({ "perfil.name": req.body.perfil.name })
        .then(userDB => {
            // console.log("userDB :", userDB);
            service.comparePass(req.body.perfil.password, userDB.perfil.password)
            .then(resp => {
                res.send(resp);
            })
            .catch(err => {
                res.send(err);
            });
        })
        .catch(err => {});
    },

    signUp: (req, res) => {
        // console.log('req.body.perfil.name :', req.body.perfil.name);
        const user = new User({
            perfil: {
                name: req.body.perfil.name,
                email: req.body.perfil.email,
                password: req.body.perfil.password
            }
        });
        // console.log('user :', user);
        /*
            user.save()
                .then(()=>{res.status(201).send({ token: service.createToken(user)})})
                .catch(()=>{res.status(500).send({message: `Error al crear el usuario: ${err}`})})
        */
        user.save(err => {
            if (err)
            return res
                .status(500)
                .send({ message: `Error al crear el usuario: ${err}` });

            return res.status(201).send({ token: service.createToken(user) });
        });
    }
};

module.exports = userController;
