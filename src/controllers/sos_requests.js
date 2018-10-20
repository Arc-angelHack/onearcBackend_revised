const model = require('../models/sos_requests')

// get all sos requests in 20 miles range nearby 
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
      error: 'Could not retrieve all requests'
    })
  }
}


module.exports = {
  getAll
}