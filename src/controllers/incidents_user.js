const { plural } = require('pluralize')
const model = require('../models/incidents_user')
const { parseToken } = require('../lib/auth')

/////////////////
// BY A SINGLE USER
////////////////

const retrieveId = (req) => {
    const token = parseToken(req.headers.authorization)
    const user_id = token.sub.id
    return user_id
}

// get all the incidents made by a user 
const index = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const data = await model.index(user_id)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not get all incidents by this user'
        })
    }
}

// user creates an incident report 
const create = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const response = await model.create(user_id, req.body)
        if (response) {
            res.status(201).json({ data: response[0] })
        } else {
            next({
                status: 400,
                error: `Incident already exists`
            })
        }
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Incident could not be created`
        })
    }
}


const patch = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const inId = req.params.inId
        const data = await model.patch(user_id, inId, req.body)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Incident could not be updated`
        })
    }
}

const destroy = async (req, res, next) => {
    try {
        const data = await model.destroy(req.params.inId)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Incident could not be destroyed`
        })
    }
}


module.exports = {
    index,
    create,
    patch,
    destroy
}