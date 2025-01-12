const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  
  // Check if token exists and is valid in database
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
      isValid: true,
      expiresAt: {
        gt: new Date()
      }
    },
    include: {
      user: true
    }
  })
  
  if (!storedToken) return res.sendStatus(403)
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: storedToken.user.username })
    res.json({ accessToken: accessToken })
  })
})

router.delete('/logout', async (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) return res.sendStatus(400)
  
  // Invalidate the refresh token
  await prisma.refreshToken.updateMany({
    where: {
      token: refreshToken
    },
    data: {
      isValid: false
    }
  })
  
  res.sendStatus(204)
})

router.post('/login', async (req, res) => {
  const username = req.body.username
  
  // Find the user
  const user = await prisma.user.findFirst({
    where: { username }
  })
  
  if (!user) return res.sendStatus(401)
  
  const accessToken = generateAccessToken({ name: username })
  const refreshToken = jwt.sign({ name: username }, process.env.REFRESH_TOKEN_SECRET)
  
  // Store refresh token in database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    }
  })
  
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`authHEader: ${authHeader}, token: ${token}`);
    
    if (token === null){
        res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next();
    })
}

module.exports = { authenticateToken, router: router }