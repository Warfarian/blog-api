const { Router } = require("express")
const commentsRouter = Router();
const apiController = require('../controllers/apiController')

const comments = {
    commentId : 1,
    post : 1
}

commentsRouter.get('/', apiController.getAllComments)
 
 commentsRouter.post('/', apiController.addComments)  

 module.exports = commentsRouter;