
'use strict';

const express = require('express');
const app = express();

const HomeRoutes = require('../routes/homeRoutes');
const LoginRoutes = require('../routes/loginRoutes');
const UserRoutes = require('../routes/userRoutes');
const PostRoutes = require('../routes/postRoutes');
const CommentRoutes = require('../routes/commentRoutes');
const WallRoutes = require('../routes/wallRoutes');


app.use('/api/user', UserRoutes);
app.use('/api/wall', WallRoutes);    
app.use('/api/post', PostRoutes);
app.use('/api/comment', CommentRoutes); 
app.use('/api/login', LoginRoutes);   
app.use('/', HomeRoutes);   

module.exports = app;