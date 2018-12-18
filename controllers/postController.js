'use_strict';
require('../config/connection.js');

const schemaPost = require('../models/postSchema');
const schemaWall = require('../models/wallShema');
const Post = schemaPost.Post;
const Wall = schemaWall.Wall;

const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

const postController = {

    ShowAll: (req, res) => {
        Post.find({ "userId": req.body.userId, "deleted": false })
            .then(postDB => { res.status(200).send({ postDB }) })
            .catch(err => { res.status(400).json({ "ok": false, err }) })
    },

    create: (req, res) => {
        const body = req.body;

        let newPost = new Post({
            userId: body.userId,
            userName: body.userName,
            date: moment().format(),
            title: body.postTitle,
            text: body.postText,
            postType: body.postType,
            groups: body.postGroup,
            edited: false,
            deleted: false
        })
        //pre create, revisar si el usuario tiene un wall para el mes/año actual?
        Post.create(newPost)
            .then(postDB => {
                //res.status(200).send({postDB})

                const datePost = new Date(postDB.date);

                const filter = {
                    "month": datePost.getMonth() + 1,
                    "year": datePost.getFullYear()
                }

                const postWall = {
                    _id: ObjectId(postDB._id),
                    userId: postDB.userId,
                    userName: postDB.userName,
                    date: postDB.date,
                    title: postDB.title,
                    text: postDB.text,
                    postType: postDB.postType,
                    groups: postDB.groups,
                    edited: postDB.edited
                };

                Wall.updateMany(filter, { $push: { posts: postWall } })
                    .then(result => {
                        if (result.n > 0) {
                            res.status(200).json({ "ok": true, "postId": postDB._id, "result": result })
                        } else {
                            res.status(200).json({ "ok": false, "msg": "sin coincidencias para actualizar" })
                        }
                    })
                    .catch(err => { res.status(400).json({ "ok": false, "err": err }) });
            })
            .catch(err => { res.status(400).json({ "ok": false, "err": err }) })
    },

    update: (req, res) => {
        const body = req.body;

        let filter = {
            _id: ObjectId(`${body.postId}`),
            userId: body.userId
        }

        let newDataPost = {
            dateMod: moment().format(),
            title: body.postTitle,
            text: body.postText,
            postType: body.postType,
            groups: body.postGroup,
            edited: true,
            deleted: false
        }

        Post.updateOne(filter, newDataPost, {
            new: true
        })
            .then(postDB => {
                //res.status(200).send(postDB)
                //WALL

                filter = {
                    "posts._id": ObjectId(`${body.postId}`),
                }

                const postWall = {
                    "posts.$.dateMod": newDataPost.dateMod,
                    "posts.$.title": newDataPost.title,
                    "posts.$.text": newDataPost.text,
                    "posts.$.postType": newDataPost.postType,
                    "posts.$.groups": newDataPost.groups,
                    "posts.$.edited": newDataPost.edited
                };

                Wall.updateMany(filter, { $set: postWall })
                    .then((result) => { res.status(200).send({ post: postDB, wall: result }) })
                    .catch((err) => { res.status(400).send({ err }) });
            })
            .catch(console.error.bind(console, 'error: '))
    },

    delete: (req, res) => {

        const postId = req.body.postId;

        let filter = {
            _id: ObjectId(`${postId}`),
            userId: req.body.userId
        }

        let newDataPost = {
            dateMod: moment().format(),
            edited: true,
            deleted: true
        }

        Post.updateOne(filter, newDataPost, {
            new: true
        })
            .then(postDB => {


                const userId = req.body.userId;

                filter = {
                    "posts._id": ObjectId(`${postId}`)
                }

                Wall.find(filter, (err, wallDB) => {

                    if (err) {
                        res.status(400).json({ ok: false, msg: 'No se ha borrado el post de los wall', err })
                    }

                    if (wallDB.length > 0) { //wallDB != undefined

                        wallDB.forEach(wall => {

                            wall.posts.forEach(post => {

                                if (String(post._id) === String(postId)) {
                                    post.remove();
                                    wall.save();
                                }
                            });

                        });

                        res.status(200).json({ ok: true, postDB, wallDB })

                    } else {
                        res.status(400).json({ ok: false, msg: "No se encontraron WALL`s con dicho POST", err })
                    }

                })

                // wallController.removeWallPost(req, res)
                //     .then((postWall) => {
                //         res.status(200).send({
                //             postDB,
                //             postWall
                //         })
                //     }).catch((err) => {
                //         res.status(400).json({
                //             ok: false,
                //             msg: 'No se ha borrado el post',
                //             err
                //         })
                //     });

            })
            .catch(err => { res.status(400).json({ "ok": false, err }) })

    }
}


module.exports = postController


// create: (req, res) => {
//     const body = req.body;

//     let newPost = new Post({
//         userId: body.userId,
//         userName: body.userName,
//         date: moment().format(),
//         title: body.postTitle,
//         text: body.postText,
//         postType: body.postType,
//         groups: body.postGroup,
//         edited: false,
//         deleted: false
//     })
//     //pre create, revisar si el usuario tiene un wall para el mes/año actual
//     Post.create(newPost)
//         .then(postDB => {
//             //res.status(200).send(postDB)

//             //postDB NO RETORNA UN OBJETO de la colección POST

//             //if (postDB.ok === 1) {
//             wallController.insertWallPost(req, postDB)
//                 .then((result) => {
//                     res.status(200).send({
//                         postId: newPost._id,
//                         result
//                     })
//                 }).catch((err) => {
//                     res.status(400).send({
//                         err
//                     })
//                 });
//             //} else {
//             //     res.send({
//             //         error: 'Error , no se ha creado el post'
//             //     })
//             // }
//         })
//         .catch(console.error.bind(console, 'error: '))
// }