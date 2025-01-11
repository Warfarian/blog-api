const { Router } = require("express")
const postsRouter = Router();
const apiController = require("../controllers/apiController")

const posts = {
    userId : 1,
    postId : 1
}

postsRouter.get('/', apiController.getAllPosts)

postsRouter.post('/', apiController.addPosts)  

module.exports = postsRouter