'use_strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;


commentWall = {
    postId: ObjectId,
    userId: String,
    userName: String,
    date: Date,
    text: String
};

postWall = {
    userId: String,
    userName: String,
    date: Date,
    title: String,
    text: String,
    postType: String,
    groups: String,
    edited: Boolean,
    dateMod: Date,
    comments: [commentWall]
};

wallSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'WALL -> USER_ID es obligatorio.']
    },
    month: {
        type: Number,
        required: [true, 'WALL -> MONTH es obligatorio.']
    },
    year: {
        type: Number,
        required: [true, 'WALL -> YEAR es obligatorio.']
    },
    blocked: [String], //Usuarios bloqueados
    posts: [
        postWall
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    dateDel: Date //Fecha Borrado
});

// mongoose.model ('NOMBRE DE LA COLECCIÓN',commentSchema)
let Wall = mongoose.model('wall', wallSchema)

module.exports = {
    Wall
}