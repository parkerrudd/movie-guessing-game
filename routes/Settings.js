const express = require('express')
const Settings = require('../models/Settings')
const router = express.Router()

router.get('/', async (req, res) => {
    const settings = await Settings.find()

    res.json(settings)
})

router.post('/new', (req, res) => {
    const setting = new Settings({
        text: req.body.text
    })

    setting.save()

    res.json(setting)
})

router.put('/toggle/:id', async (req, res) => {
    const toggle = await Settings.findById(req.params.id)

    toggle.toggled = !toggle.toggled

    toggle.save()

    res.json(toggle)
})

router.delete('/delete/:id', async (req, res) => {
    const result = await Settings.findByIdAndDelete(req.params.id)

    res.json(result)
})

module.exports = router