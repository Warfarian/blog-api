const { Router } = require("express")
const postsRouter = Router();
const apiController = require("../controllers/apiController")

postsRouter.get('/', apiController.getAllPosts)

postsRouter.post('/', apiController.addPosts)  

module.exports = postsRouter


// SETUP JWT FIRST