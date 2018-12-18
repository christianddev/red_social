const mongoose = require('mongoose');
const Schema = mongoose.Schema

groupSchema = new Schema({
    _id: {
        type: String,
        require: [true, 'El ID_GROUP es obligatorio.']
    },
    users: [{
        type: Number
    }]
});

userSchema = new Schema({
    // _id de momento se trabajara como ObjectId
    // _id: {
    //     type: Number,
    //     required: [true, 'El ID es obligatorio.']
    // },
    perfil: {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password:{
            type:String,
            //select:false, //se comenta para comparar vs los datos de acceso
            required: [true, 'El PASSWORD es obligatorio.']
        }
    },
    groups: [groupSchema],
    blocked: [{
        id: Number
    }]


});

// mongoose.model ('NOMBRE DE LA COLECCIÓN',commentSchema)
let User = mongoose.model('user', userSchema);
let Group = mongoose.model('group', groupSchema);

module.exports = {
    User,
    Group
}