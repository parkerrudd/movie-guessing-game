const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const settingsRoute = require('./routes/Settings')
const registerRoute = require('./routes/Register')
const loginRoute = require('./routes/Login')
const gameRoute = require('./routes/Game')
const winRoute = require('./routes/Win')
const statisticsRoute = require('./routes/Statistics')
const path = require('path')
 
const app = express()

app.use(cors())
app.use(express.json())

app.use('/statistics', statisticsRoute)
app.use('/win', winRoute)
app.use('/game', gameRoute)
app.use('/api/register', registerRoute)
app.use('/settings', settingsRoute)
app.use('/api/login', loginRoute)


mongoose.connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

    .then((console.log('Connected to database')))
    .catch(console.error)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('frontend/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 3004

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))
