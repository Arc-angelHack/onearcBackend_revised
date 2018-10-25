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

app.use('/api/users', require('./src/routes/users'))
app.use('/incidents', require('./src/routes/incidents'))
app.use('/incidents/byuser', require('./src/routes/incidents_user')) // incidents created by a user 
app.use('/sosrequests', require('./src/routes/sos_requests'))
app.use('/api/resOffer', require('./src/routes/resource_offers')) // CRUD for resource offers
app.use('/api/resRequest', require('./src/routes/resource_requests')) // CRUD for resource requests (similar to above; can merge eventually)
app.use('/api/resTrans', require('./src/routes/resource_transactions')) // Create & Delete for Resource Transactions

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