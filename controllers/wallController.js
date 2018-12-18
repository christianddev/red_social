'use_strict';

require('../config/connection.js');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;

//Schema
const schemaWall = require('../models/wallShema');
const schemaPost = require('../models/postSchema');
const Wall = schemaWall.Wall;
const Post = schemaPost.Post;


let WallController = {

    showWallUser: (req, res) => {

        let filter = {
            userId: req.body.userId,
            month: req.body.month,
            year: req.body.year
        }

        Wall.find(filter)
            .then((wallDB) => { res.status(200).send({ wallDB }) })
            .catch(err => { res.status(400).json({ "ok": false, err }) })

    },

    createWallUser: (req, res) => {
        const body = req.body;

        let newWall = new Wall({
            userId: body.userId,
            month: body.month,
            year: req.body.year,
            blocked: req.body.blocked, //Usuarios bloqueados
            posts: req.body.posts,
            deleted: false
        });

        Wall.create(newWall)
            .then(wallDB => { res.status(200).send({ wallDB }); })
            .catch(err => { res.status(400).send({ err }); })
    },

    // insertWallPost: (req, postDB) => {
    //     return new Promise((resolve, reject) => {
    //         try {

    //             const datePost = new Date(postDB.date);

    //             const filter = {
    //                 month: datePost.getMonth(),
    //                 year: datePost.getFullYear()
    //             }

    //             const postWall = {
    //                 _id: ObjectId(postDB._id),
    //                 userId: postDB.userId,
    //                 userName: postDB.userName,
    //                 date: postDB.date,
    //                 title: postDB.title,
    //                 text: postDB.text,
    //                 postType: postDB.postType,
    //                 groups: postDB.groups,
    //                 edited: postDB.edited
    //             };

    //             Wall.updateMany(filter, {
    //                     $push: {
    //                         posts: postWall
    //                     }
    //                 })
    //                 .then((result) => {
    //                     resolve(result)
    //                 }).catch((err) => {
    //                     reject(err);
    //                 });

    //         } catch {
    //             reject({
    //                 status: 400,
    //                 message: 'Error al insertar Post en Wall'
    //             })
    //         }
    //     })
    // },

    updateWallPost: (req, res) => {
        //desde el wall modificar contenido de un post

        const body = req.body;
        const postId = body.postId;
        let filter = {
            "userId": body.userId,
            "posts._id": ObjectId(`${postId}`),
            "posts.userId": body.userId
        }

        //El usuario del wall y el post son el mismo ?
        Wall.find(filter)
            .then((wallDB) => {
                if (wallDB.length == 0) {
                    res.status(401).json({ "ok": false, "msg": "sin coincidencias", wallDB })
                }
                //Actualiza colección POTS
                filter = {
                    _id: ObjectId(`${postId}`),
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

                        //Actualiza colección WALLS
                        filter = {
                            "posts._id": ObjectId(`${postId}`),
                        }

                        const postWall = {
                            "posts.$.dateMod": newDataPost.dateMod,
                            "posts.$.title": newDataPost.title,
                            "posts.$.text": newDataPost.text,
                            "posts.$.postType": newDataPost.postType,
                            "posts.$.groups": newDataPost.groups,
                            "posts.$.edited": true,
                            "posts.$.deleted": false
                        };

                        Wall.updateMany(filter, { $set: postWall })
                            .then((result) => { res.status(200).send({ post: postDB, wall: result }) })
                            .catch((errWall) => { res.status(400).send({ errWall }) });
                    })
                    .catch((errPost) => { res.status(400).send({ errPost }) });
            })
            .catch(err => { res.status(400).json({ "ok": false, "msg": "sin coincidencias", err }) })
    },

    removePost: (req, res) => {
        //db.getCollection('posts').find({}).sort({"date":-1})

        let infoDocWall = []; //Información/resumen sobre los documentos(wall´s) que se han modificado        

        const postId = req.body.postId;
        const userId = req.body.userId;

        infoDocWall.push({ "postToDelete": postId, "ownerPost": userId });

        const filter = { "posts._id": ObjectId(`${postId}`) };

        Wall.find(filter, (err, wallDB) => {

            if (err) {
                res.status(400).json({ "ok": false, err })
            } else {

                if (wallDB.length > 0) { //wallDB != undefined
                    //del documento actual
                    wallDB.forEach(wall => {

                        //por cada elemento del array de post
                        wall.posts.forEach(post => {

                            //el post del documento coincide con el borrar a borrar ?
                            if (String(post._id) === String(postId)) {

                                //información de los post que se han modificado
                                let infoPost;

                                //el usuario que quiere borrar el post(del wall), es igual al usuario propietario del post
                                if (String(wall.userId) === String(userId)) {

                                    let filterPost = { "_id": ObjectId(`${postId}`), "userId": userId }
                                    let newDataPost = { "dateMod": moment().format(), "edited": true, "deleted": true }

                                    infoPost = { "wallId": wall._id, "userId": wall.userId, "postId": post._id }

                                    //reemplazar por callback
                                    Post.updateOne(filterPost, newDataPost, { new: true })
                                        .then(postMod => { infoPost.postMod = postMod })
                                        .catch(err => { infoPost.err = err })

                                } else {
                                    infoPost = { "wallId": wall._id, "userId": wall.userId, "postId": post._id }
                                }

                                infoDocWall.push(infoPost)
                                post.remove();
                                wall.save();
                            };
                        });

                    });
                    res.status(200).json({ infoDocWall });

                } else {
                    res.status(400).json({ ok: false, msg: "No se encontraron WALL`s con dicho POST" });
                }
            }


        })
    },

    // insertWallComment: (commentDB) => {
    //     // commentWallSchema = {
    //     //     commentId: ObjectId,
    //     //     postId: ObjectId,
    //     //     userId: String,
    //     //     userName: String,
    //     //     date: Date,
    //     //     text: String
    //     // };

    //     //No contempla para post de meses anterriores, solo post de mes actual
    //     const filter = {
    //         //"posts._id": ObjectId(`${commentDB.PostId}`),
    //         "posts.comments._id": ObjectId(`${commentDB._id}`)
    //     }

    //     const postWall = {
    //         _id: commentDB._id,
    //         postId: commentDB.postId,
    //         userId: commentDB.userId,
    //         userName: commentDB.userName,
    //         date: commentDB.date,
    //         text: commentDB.text,
    //         edited: commentDB.edited,
    //         deleted: commentDB.false
    //     };

    //     Wall.updateMany(filter, {
    //         $push: {
    //             "posts.comments": postWall
    //         }
    //     })
    //         .then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err);
    //         });


    // },

    // updateWallComment: (req, res) => {
    //     // commentWallSchema = {
    //     //     commentId: ObjectId,
    //     //     postId: ObjectId,
    //     //     userId: String,
    //     //     userName: String,
    //     //     date: Date,
    //     //     text: String
    //     // };
    //     res.status(200).send('WallController.updateWallComment');
    // },

    deleteWall: (req, res) => {
        res.status(200).send('WallController.deleteWall');
    },
}

module.exports = WallController



//opciones:
    //
    //  removeWallPost : 
    //      si viene desde un post , se elimina el post de todos los wall    
    //   
    //  removePost :
    //      si un usuario no quiere ver un post en su wall, se bera modificar solo su wall
    //      si el wall y el post son del mimso usuario, además  eliminar el post de la colección posts

    // removeWallPost: (req, res) => {

    //     return new Promise((resolve, reject) => {
    //         try {

    //             const postId = req.body.postId;
    //             const userId = req.body.userId;

    //             const filter = {
    //                 "posts._id": ObjectId(`${postId}`)
    //             }

    //             Wall.find(filter, (err, wallDB) => {

    //                 if (err) {
    //                     reject(err)
    //                 }

    //                 if (wallDB.length > 0) { //wallDB != undefined

    //                     wallDB.forEach(wall => {

    //                         wall.posts.forEach(post => {

    //                             if (String(post._id) === String(postId)) {
    //                                 post.remove();
    //                                 wall.save();
    //                             }
    //                         });

    //                     });
    //                     resolve({
    //                         wallDB
    //                     })

    //                 } else {
    //                     reject({
    //                         ok: false,
    //                         msg: "No se encontraron WALL`s con dicho POST"
    //                     })
    //                 }

    //             })

    //         } catch (error) {
    //             reject({
    //                 ok: false,
    //                 msg: 'Error al intentar realizar la consulta',
    //                 error
    //             })
    //         }
    //     })


    // },