const db = require('../db/knex')
const { filterByLocation } = require('./helpers')

const joinTbs = () => {
    return db('resources')
        .where({
            is_an_offer: true,
            finished: false
        })
        .select('resources.id AS resource_id', '*')
        .join('users', 'users.id', '=', 'resources.user_id')
}

const getAll = async (query) => {
    const resourceOffers = await joinTbs()
    const nearbyOffers = filterByLocation(resourceOffers, query)
    return nearbyOffers
}

const getOne = (resId) => {
    return db('resources')
        .select('resources.id AS resource_id', '*')
        .join('users', 'users.id', '=', 'resources.user_id')
        .where('resources.id', resId)
        .first()
}

const createOne = (body) => {
    return db('resources')
        .insert({
            ...body,
            is_an_offer: true
        })
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

const updateOffer = (id, body) => {
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

const completeOffer = (resId) => {
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

const deleteOffer = (resId) => {
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
    updateOffer,
    completeOffer,
    deleteOffer
}