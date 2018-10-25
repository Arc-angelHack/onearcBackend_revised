const model = require('../models/incidents')

//////////////
// ANY USER
/////////////

// getAll incidents in 20 miles range nearby. Change the range in the query param
const getAll = async (req, res, next) => {
    try {
        let data = await model.getAll(req.query)
        res.send({
            data
        })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not retrieve all incidents nearby'
        })
    }
}

// getOne incident 
const getOne = async (req, res, next) => {
    try {
        let data = await model.getOne(req.params.inId)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not retrieve the incident'
        })
    }
}


module.exports = {
    getAll,
    getOne
}