const { Router } = require("express");
const registerRouter = Router();
const apiController = require("../controllers/apiController");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { v4: uuid } = require("uuid");
const prisma = new PrismaClient();

registerRouter.post('/', async (req, res) => {
    try {
        const { username, password} = req.body;
        const author = true // cus only authors will have access to this website
        console.log(username,password,author);
        
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: { username: username }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuid();
        // Create new user
        const newUser = await prisma.user.create({
            data: {
                userId: userId,
                username,
                password: hashedPassword,
                author: author || false
            }
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;
        
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ error: "Error registering user" });
    }
});

module.exports = registerRouter;