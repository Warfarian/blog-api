const { Router } = require("express")
const commentsRouter = Router();

const comments = {
    commentId : 1,
    post : 1
}

commentsRouter.get('/', (req,res)=>{
    res.json(comments) 
 })
 
 commentsRouter.post('/', (req,res)=>{
     res.json()
 })  

 module.exports = commentsRouter;