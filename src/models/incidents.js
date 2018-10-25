const db = require('../db/knex')
const { filterByLocation } = require('./helpers')

////////////
// ANY USER 
///////////

const tbName = 'incidents'
const joinTbs = () => {
    return db(tbName)
        .select('incidents.id AS incident_id', '*')
        .join('users', 'users.id', '=', 'incidents.user_id')
}

// view all incidents within 20 miles range by giving lat, long & range (defaults to 20 miles)
const getAll = async (query) => {
    const incidents = await joinTbs()
    const nearbyReq = filterByLocation(incidents, query)
    return nearbyReq
}

// getOne incident
const getOne = async (inId) => {
    return joinTbs()
        .where('incidents.id', inId)
        .first()
}


module.exports = {
    getAll,
    getOne
}