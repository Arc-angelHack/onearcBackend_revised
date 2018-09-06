const model = require('../models/incidents')

const getAll = async (req, res, next) => {
    let data = await model.getAll()
    res.send({
        data
    })
}


module.exports = {
    getAll
}