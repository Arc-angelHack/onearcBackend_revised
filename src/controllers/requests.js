const model = require('../models/requests')

const getAll = async (req, res, next) => {
    let data = await model.getAll()
    res.send({
        data
    })
}


module.exports = getAll 