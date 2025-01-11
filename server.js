const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

require("dotenv").config();
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000")
}) 

