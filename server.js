const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
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

const Settings = require('./models/Settings')

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))