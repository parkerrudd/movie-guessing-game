const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Settings = require('./models/Settings')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
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



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))