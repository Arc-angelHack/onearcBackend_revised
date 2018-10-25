const model = require('../models/resource_requests')

const getAll = async (req, res, next) => {
    try {
        const data = await model.getAll(req.query)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve all resources requests'
        })
    }
}

const getOne = async (req, res, next) => {
    try {
        const data = await model.getOne(req.params.resId)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retreive selected resource request'
        })
    }
}

const createRequest = async (req, res, next) => {
    try {
        const data = await model.createOne(req.body)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not post resource request at this time'
        })
    }
}

const updateRequest = async (req, res, next) => {
    try {
        const data = await model.updateRequest(req.params.resId, req.body)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not update selected resource request'
        })
    }
}

const completeRequest = async (req, res, next) => {
    try {
        const data = await model.completeRequest(req.params.resId)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not complete selected request at this time'
        })
    }
}

const deleteRequest = async (req, res, next) => {
    try {
        const data = await model.deleteRequest(req.params.resId)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not delete request at this time'
        })
    }
}

module.exports = {
    getAll,
    getOne,
    createRequest,
    updateRequest,
    completeRequest,
    deleteRequest
}