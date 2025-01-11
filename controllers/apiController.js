const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const {v4:uuid} = require('uuidv4');
const bcrypt = require("bcryptjs");

async function getAllPosts(req,res) {
    const allPosts = await prisma.posts.findMany();
    res.json(allPosts);
}

async function getAllComments(req,res) {
    
}

async function addPosts(req,res) {
    const postToAdd = await prisma.posts.create({

    })
    //   postId Int @id @unique @default(autoincrement())
    //   authorId String 
    //   author User @relation(fields: [authorId], references: [userId])
    //   title String  @default("Just a chill guy post")
    //   content String @default("lorem ipsum dolor")
    //   comments Comments[] 
}

async function deletePosts(req,res) {
    const deletePost = await prisma.posts.delete({
        where: {
            // postId
        }
    })
}

async function getAllUsers(req,res) {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
}

async function addUser(req,res) {
    const userId = uuid();
    const {title, content , username, author, password} = req.body;
    const hash = bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
        } 
      });
    const addUser = await prisma.user.create({
        userId: userId,
        username: username,
        author: author,
        password: hash,
        title: title,
        content: content
    })
}

module.exports = { addUser, getAllComments, getAllPosts,getAllUsers, addPosts, deletePosts }