const model = require('../models/requests')

const getAll = async (req, res, next) => {
    try {
        let data = await model.getAll()
        res.send({
            data
        })
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve all requests'
        })
    }
}


module.exports = {
    getAll
}