const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3004

const settingsRoute = require('./routes/Settings')
const registerRoute = require('./routes/Register')
const loginRoute = require('./routes/Login')
const gameRoute = require('./routes/Game')
const winRoute = require('./routes/Win')
const statisticsRoute = require('./routes/Statistics')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/statistics', statisticsRoute)
app.use('/win', winRoute)
app.use('/game', gameRoute)
app.use('/register', registerRoute)
app.use('/settings', settingsRoute)
app.use('/login', loginRoute)


mongoose.connect("mongodb://127.0.0.1:27017/movie-game", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

    .then((console.log('Connected to database')))
    .catch(console.error)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))