const model = require('../models/resource_transactions')

const getAll = async (req, res, next) => {
    try {
        const data = await model.getAll(req.params.resId)
        res.send({data})
    } catch (e) {
        next({
            status: 404,
            error: "Could not retreive transactions for this resource"
        })
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const data = await model.getAllUser(req.params.userId)
        res.send({data})
    } catch (e) {
        next({
            status: 404,
            error: "Could not retreive transactions for this user"
        })
    }
}

const createTrans = async (req, res, next) => {
    try {
        const data = await model.createTrans(req.params)
        res.send({data})
    } catch (e) {
        next({
            status: 404,
            error: "Could not create transaction"
        })
    }
}

const deleteTrans = async (req, res, next) => {
    try {
        const data = await model.deleteTrans(req.params)
        res.send({data})
    } catch (e) {
        next({
            status: 404,
            error: "Could not delete transaction"
        })
    }
}

module.exports = {
    getAll,
    getAllUser,
    createTrans,
    deleteTrans
}