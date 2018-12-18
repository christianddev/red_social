'use_strict';

const mongoose = require('mongoose')
const config = require('./config');
mongoose.connect(config.db , {useNewUrlParser: true})
    .then(()=>console.log(`Connection established : ${config.dbName}`))
    .catch(console.error.bind(console, 'error: '))

