const express = require("express");
const app = express();
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const commentsRouter = require("./routes/commentsRouter");
const registerRouter = require("./routes/registerRouter");
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { authenticateToken, router: authRouter } = require('./auth/authConfig')

require("dotenv").config();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())  // Add this line to parse JSON bodies

// Auth routes
app.use('/api/auth', authRouter);

// Protected routes - these require authentication
app.use('/api/posts', authenticateToken, postsRouter);
app.use('/api/user', authenticateToken, userRouter);
app.use('/api/comments', authenticateToken, commentsRouter);
// login and logout are in authConfig.js

app.use('/api/register', registerRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)})
