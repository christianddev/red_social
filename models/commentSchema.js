'use_strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

commentSchema = new Schema({
   
    postId: {
        type: ObjectId,
        required: [true, 'Comment -> POST_ID es obligatorio.']
    },
    userId: {
        type: String,
        require: [true, 'Comment -> USER_ID es obligatorio.']
    },
    userName: {
        type: String,
        require: [true, 'Comment -> USER_NAME es obligatorio.']
    },
    date: {             //Fecha publicación
        type: Date,
        require: [true, 'Comment -> DATE es obligatorio.']
    },
    text: {
        type: String,
        require: [true, 'Comment -> TEXT es obligatorio.']
    },
    edited:{
        type:Boolean,
        default:false
    },
    dateEdit:Date,      //Fecha edición
    deleted: {
        type:Boolean,
        default:false
    },
    dateDel:Date      //Fecha "borrado"
});

// mongoose.model ('NOMBRE DE LA COLECCIÓN',commentSchema)
let Comment = mongoose.model('comment', commentSchema)

module.exports = {
    Comment
}