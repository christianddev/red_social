const mongoose = require('mongoose');
const Schema = mongoose.Schema

postSchema = new Schema({

    userId: {
        type: String,
        require: [true, 'Post -> USER_ID es obligatorio.']
    },
    userName: {
        type: String,
        require: [true, 'Post -> USER_NAME es obligatorio.']
    },
    date: {
        type: Date,
        require: [true, 'Post -> DATE es obligatorio.']
    },
    title: {
        type: String,
        require: [true, 'Post -> TITLE es obligatorio.']
    },
    text: {
        type: String,
        require: [true, 'Post -> TEXT es obligatorio.']
    },
    postType: {
        type: String,
        default: 'public'
    },
    groups: String,
    edited: {
        type: Boolean,
        default: false
    },
    dateMod: Date, //Fecha modificación
    deleted: {
        type: Boolean,
        default: false
    },
    dateDel: Date //Fecha borrado

});

// mongoose.model ('NOMBRE DE LA COLECCIÓN',commentSchema)
let Post = mongoose.model('post', postSchema)

module.exports = {
    Post
};