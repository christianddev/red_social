'use_strict';

require('../config/connection.js');
const schemaComment = require('../models/commentSchema');
const schemaWall = require('../models/wallShema');
const Comment = schemaComment.Comment;
const Wall = schemaWall.Wall;

const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

let postController = {

    //Muestra los comentarios de un post
    ShowAll: (req, res) => {

        let filter = {
            postId: ObjectId(req.body.postId)
            //deleted: false
        }

        Comment.find(filter)
            .then(commentDB => {
                res.status(200).send({ commentDB });
            })
            .catch(console.error.bind(console, 'error: '))

    },

    //Crea un comentario para un post
    create: (req, res) => {
        const body = req.body;

        let newComment = new Comment({
            postId: ObjectId(body.postId),
            userId: body.commentUserId,
            userName: body.commentUser,
            date: moment().format(),
            text: body.commentText,
            edited: false,
            deleted: false
        })

        Comment.create(newComment)
            .then(commentDB => {

                const filter = {
                    "posts._id": ObjectId(`${commentDB.PostId}`),
                    //"posts.comments._id": ObjectId(`${commentDB._id}`)
                }
                console.log(filter);

                Wall.find(filter, (err, wallDB) => {

                    if (err) {
                        res.status(400).json({ ok: false, msg: 'No se ha incluido el comentario en el wall', err })
                    }
                    console.log(wallDB);

                    if (wallDB.length > 0) { //wallDB != undefined

                        wallDB.forEach(wall => {

                            wall.posts.forEach(post => {

                                // if (String(post._id) === String(postId)) {
                                //     post.remove();
                                //     wall.save();
                                // }
                                console.log(post._id);
                            });

                        });

                        res.status(200).json({ ok: true, postDB, wallDB })

                    } else {
                        res.status(400).json({ ok: false, msg: "No se encontraron WALL`s con dicho POST", err })
                    }

                })

            })
            .catch((err) => { res.status(400).json({ "ok": false, err }) });
    },

    //Actualiza un comentario de un post
    update: (req, res) => {
        const body = req.body;

        let filter = {
            _id: ObjectId(body.commentId),
            userId: body.userId
        }

        let updateComment = {
            dateEdit: moment().format(),
            text: body.commentText,
            edited: true,
            deleted: false
        }

        Comment.updateOne(filter, updateComment, {
            new: true
        })
            .then(commentDB => {
                res.status(200).send(commentDB)
            })
            .catch(console.error.bind(console, 'error: '))
    },

    //Actualzia el estado de  un comentario en un post
    delete: (req, res) => {
        const body = req.body;

        let filter = {
            _id: ObjectId(body.commentId),
            userId: body.userId
        }

        let newData = {
            edited: true,
            deleted: true
        }

        Comment.updateOne(filter, newData, {
            new: true
        })
            .then(commentDB => {
                res.status(200).send(commentDB)
            })
            .catch(console.error.bind(console, 'error: '))

    },
}

module.exports = postController