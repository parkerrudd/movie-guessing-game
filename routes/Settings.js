const express = require('express')
const Settings = require('../models/Settings')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')

router.put('/superHero/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    user.superHero = !user.superHero

    user.save()

    res.json(user)
})

router.post('/superHero', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        await User.updateOne(
            { email: email }, 
            { $set: { superHero: !user.superHero }}
            )

        user.save()

        return res.json({ status: 'ok', superHero: user.superHero })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.post('/scifi', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        await User.updateOne(
            { email: email }, 
            { $set: { scifi: !user.scifi }}
            )

        user.save()

        return res.json({ status: 'ok', scifi: user.scifi })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.post('/comedies', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        await User.updateOne(
            { email: email }, 
            { $set: { comedies: !user.comedies }}
            )

        user.save()

        return res.json({ status: 'ok', comedies: user.comedies })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.post('/best-pictures', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.decode(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        await User.updateOne(
            { email: email }, 
            { $set: { bestPictures: !user.bestPictures }}
        )


        res.json({ status: 'ok', bestPictures: user.bestPictures })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token'} )
    }
})

module.exports = router