const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name, 
            email: req.body.email, 
            password: newPassword
        })
        res.json({ status: 'ok' })
    } catch(err) {
        res.json({ status: 'error', error: 'Duplicate Email' })
    }
})

router.get('/', async (req, res) => {
    const users = await User.find()

    res.json(users)
})

module.exports = router