const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const {
    PORT = 5000, NODE_ENV = 'development'
} = process.env

if (NODE_ENV === 'development') {
    require('dotenv').load()
    app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(cors())

app.use('/incidents', require('./src/routes/incidents'))
app.use('/requests', require('./src/routes/requests'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/:userId/incidents', require('./src/routes/incidents_user'))
app.use('/api/:userId/requests', require('./src/routes/requests_user')) // a victim can view all the help requests they ask for 
app.use('api/:userId/helpout', require('./src/routes/requests_helper')) // a helper can view all the help requests that he offers 

app.use((err, req, res, next) => {
    if (NODE_ENV === 'development') console.error(err)

    const message = `Something went wrong.`
    const {
        status = 500, error = message
    } = err

    res.status(status).json({
        status,
        error
    })
})

app.use((req, res, next) => {
    const status = 404
    const error = `Could not ${req.method} ${req.url}`

    next({
        status,
        error
    })
})

if (NODE_ENV !== 'testing') {
    const listener = () => console.log(`Listening on port ${PORT}!`)
    app.listen(PORT, listener)
}

module.exports = app