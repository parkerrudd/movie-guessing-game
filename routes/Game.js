const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        await User.updateOne(
            { email: email }, 
            { $set: { gamesPlayed: user.gamesPlayed + 1 }}
            )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

module.exports = router