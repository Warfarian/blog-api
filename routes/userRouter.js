const { Router } = require("express")
const userRouter = Router();
const apiController = require("../controllers/apiController")

userRouter.get('/', apiController.getAllUsers)

module.exports = userRouter