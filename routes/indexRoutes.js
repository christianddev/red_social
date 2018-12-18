
'use strict';

const express = require('express');
const app = express();

const LoginRoutes = require('../routes/loginRoutes');
const UserRoutes = require('../routes/userRoutes');
const PostRoutes = require('../routes/postRoutes');
const CommentRoutes = require('../routes/commentRoutes');
const WallRoutes = require('../routes/wallRoutes');


app.use('/user', UserRoutes);
app.use('/wall', WallRoutes);    
app.use('/post', PostRoutes);
app.use('/comment', CommentRoutes); 
app.use('/login', LoginRoutes);        

module.exports = app;