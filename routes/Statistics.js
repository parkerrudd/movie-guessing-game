const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/Settings')


router.get('/', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok',
            gamesPlayed: user.gamesPlayed, 
            gamesWon: user.gamesWon, 
            superHero: user.superHero, 
            scifi: user.scifi, 
            comedies: user.comedies, 
            bestPictures: user.bestPictures
        })
    } catch(error) {
        console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
    }
})



module.exports = router

