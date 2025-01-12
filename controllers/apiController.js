const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()


async function getAllPosts(req,res) {
    const allPosts = await prisma.posts.findMany();
    res.json(allPosts);
}

async function getAllComments(req,res) {
    try{
        const allComments = await prisma.comments.findMany({})
        res.json(allComments);
    }catch(err){
        console.error("Error fetching all comments", err)
    }
}

async function addPosts(req,res) {
    const { username,title,content } = req.body;
    try{
        const userId = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        
    }catch(err) {console.error('error finding userId to add posts',err.message)}
    try{
    const postToAdd = await prisma.posts.create({
        authorId: userId,
        title: title,
        content: content
    })
    console.log("Successfully added post");
    res.json(postToAdd)
} catch(err){
        console.error('Error adding posts',err);
    }
}

async function deletePosts(req,res) {
    
    const deletePost = await prisma.posts.delete({
        where: {
            // postId
        }
    })
}

async function updatePost(req,res) {
    
}

async function getAllUsers(req,res) {
    try{
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    }
    catch(err){
        console.error('Error fetching all users', err);
    }
}

async function addComments(req,res) {
    
}

module.exports = { updatePost, getAllComments,addComments, getAllPosts,getAllUsers, addPosts, deletePosts }