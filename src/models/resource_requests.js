const db = require('../db/knex')
const { filterByLocation } = require('./helpers')

const joinTbs = () => {
    return db('resources')
        .where({
            is_an_offer: false,
            finished: false
        })
        .select('resources.id AS resource_id', '*')
        .join('users', 'users.id', '=', 'resources.user_id')
}

const getAll = async (query) => {
    const resourceRequests = await joinTbs()
    const nearbyRequests = filterByLocation(resourceRequests, query)
    return nearbyRequests
}

const getOne = (resId) => {
    return joinTbs()
        .where({
            id: resId
        })
        .first()
}

const createOne = (body) => {
    return db('resources')
        .insert({
            ...body,
            is_an_offer: false
        })
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

const updateRequest = ({id, ...body}) => {
    return db('resources')
        .where({
            id
        })
        .update({
            ...body
        })
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

const completeRequest = (resId) => {
    return db('resources')
        .where({
            id: resId
        })
        .update({
            finished: true
        })
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

const deleteRequest = (resId) => {
    return db('resources')
        .where({
            id: resId
        })
        .del()
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

module.exports = {
    getAll,
    getOne,
    createOne,
    updateRequest,
    completeRequest,
    deleteRequest
}