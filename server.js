'use strict';

const config = require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/indexRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', indexRoutes);


app.listen(config.port, ()=>{
    console.log(`API REST : http://localhost:${config.port}`)
})