const model = require('../models/resource_offers')

const getAll = async (req, res, next) => {
    try {
        const data = await model.getAll(req.query)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve all resources offerings'
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
            error: 'Could not retreive selected resource offering'
        })
    }
}

const createOffer = async (req, res, next) => {
    try {
        const data = await model.createOne(req.body)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not post resource offer at this time'
        })
    }
}

const updateOffer = async (req, res, next) => {
    try {
        const data = await model.updateOffer(req.params.resId)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not update selected resource offering'
        })
    }
}

const completeOffer = async (req, res, next) => {
    try {
        const data = await model.completeOffer(req.body.id)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not complete selected offer at this time'
        })
    }
}

const deleteOffer = async (req, res, next) => {
    try {
        const data = await model.deleteOffer(req.body.id)
        res.send({data})
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not delete offer at this time'
        })
    }
}

module.exports = {
    getAll,
    getOne,
    createOffer,
    updateOffer,
    completeOffer,
    deleteOffer
}