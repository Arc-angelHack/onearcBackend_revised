const model = require('../models/personal')
const { retrieveId } = require('../models/helpers')

////////////////////////////
// PROFILE: PERSONAL INFO SECTION
///////////////////////////

const getAll = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const data = await model.getAll(user_id)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not get Personal information by this user'
        })
    }
}

// user creates Personal info 
const create = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const response = await model.create(user_id, req.body)
        if (response) {
            res.status(201).json({ data: response[0] })
        } else {
            next({
                status: 400,
                error: `Personal information already exists`
            })
        }
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Personal information could not be created`
        })
    }
}

// user can update Personal info
const patch = async (req, res, next) => {
    try {
        const user_id = retrieveId(req)
        const perId = req.params.perId
        const data = await model.patch(user_id, perId, req.body)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Personal information could not be updated`
        })
    }
}

// user can destroy Personal info
const destroy = async (req, res, next) => {
    try {
        const data = await model.destroy(req.params.perId)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Personal information could not be destroyed`
        })
    }
}


module.exports = {
    getAll,
    create,
    patch,
    destroy
}

