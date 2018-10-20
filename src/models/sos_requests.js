const db = require('../db/knex')
const { filterByLocation } = require('./helpers')

const joinTbs = () => {
  return db('sos_requests')
    .select('sos_requests.id AS sos_id', '*')
    .join('users', 'users.id', '=', 'sos_requests.user_id')
}

// getAll SOS requests by giving lat, long & range (defaults to 20 miles)
const getAll = async (query) => {
  const sosRequests = await joinTbs()
  const nearbyReq = filterByLocation(sosRequests, query)
  return nearbyReq
}

// getOne SOS request
const getOne = () => {

}

module.exports = {
  getAll,
  getOne
}