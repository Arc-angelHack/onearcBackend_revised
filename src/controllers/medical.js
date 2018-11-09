const model = require('../models/medical')
const { retrieveId } = require('../models/helpers')

////////////////////////////
// PROFILE: MEDICAL SECTION
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
          error: 'Could not get medical information by this user'
      })
  }
}

// user creates medical info 
const create = async (req, res, next) => {
  try {
      const user_id = retrieveId(req)
      const response = await model.create(user_id, req.body)
      if (response) {
          res.status(201).json({ data: response[0] })
      } else {
          next({
              status: 400,
              error: `Medical information already exists`
          })
      }
  } catch (e) {
      console.error(e)
      next({
          status: 400,
          error: `Medical information could not be created`
      })
  }
}

// user can update medical info
const patch = async (req, res, next) => {
  try {
      const user_id = retrieveId(req)
      const data = await model.patch(user_id, req.body)
      res.send({ data })
  } catch (e) {
      console.error(e)
      next({
          status: 400,
          error: `Medical information could not be updated`
      })
  }
}

// user can destroy medical info
const destroy = async (req, res, next) => {
  try {
      const data = await model.destroy(req.params.userId)
      res.send({ data })
  } catch (e) {
      console.error(e)
      next({
          status: 400,
          error: `Medical information could not be destroyed`
      })
  }
}


module.exports = {
  getAll,
  create,
  patch,
  destroy
}