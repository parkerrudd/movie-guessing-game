const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Settings = require('./models/Settings')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const PORT = 3004

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/movie-game", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

    .then((console.log('Connected to database')))
    .catch(console.error)

app.get('/settings', async (req, res) => {
    const settings = await Settings.find()

    res.json(settings)
})

app.post('/settings/new', (req, res) => {
    const setting = new Settings({
        text: req.body.text
    })

    setting.save()

    res.json(setting)
})

app.put('/settings/toggle/:id', async (req, res) => {
    const toggle = await Settings.findById(req.params.id)

    toggle.toggled = !toggle.toggled

    toggle.save()

    res.json(toggle)
})

app.delete('/settings/delete/:id', async (req, res) => {
    const result = await Settings.findByIdAndDelete(req.params.id)

    res.json(result)
})




app.post('/register', async (req, res) => {
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

app.get('/register', async (req, res) => {
    const users = await User.find()

    res.json(users)
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret1427')

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/game', async (req, res) => {
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


app.post('/win', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        await User.updateOne(
            { email: email }, 
            { $set: { gamesWon: user.gamesWon + 1 }}
            )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/win', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret1427')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', gamesPlayed: user.gamesPlayed, gamesWon: user.gamesWon })
    } catch(error) {
        console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
    }
})



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))