const db = require('../db/knex')

// get all help requests offered by a helper 
const index = (userId) => {
    return db('requests')
        .join('helpers_requests', 'helpers_requests.request_id', '=', 'requests.id')
        .join('users', 'users.id', '=', 'helpers_requests.request_id')
        .where({
            user_id: userId
        })
        .returning('*')
        .then(response => response)
}


// getOne help request that helper offers
const getOne = (userId, reqId) => {
    return db('requests')
        .join('helpers_requests', 'helpers_requests.request_id', '=', 'requests.id')
        .join('users', 'users.id', '=', 'helpers_requests.request_id')
        .where({
            user_id: userId,
            request_id: reqId
        })
        .returning('*')
        .then(response => response)
}


// create a help request
const create = (userId, reqId, body) => {
    const bodyInsert = {
        user_id: parseInt(userId),
        request_id: parseInt(reqId),
        message: body.message,
        offer_food: JSON.parse(body.offer_food),
        offer_shelter: JSON.parse(body.offer_shelter),
        offer_water: JSON.parse(body.offer_water),
        offer_medical: JSON.parse(body.offer_medical)
    }


    return db('helpers_requests')
        .insert(bodyInsert)
        .returning('*')
        .then(([response]) => response)
}

function find(id, tableName) {
    return db(tableName)
        .where({
            id
        })
        .first()
}


// update a help request 
const patch = (reqId) => {
    return find(reqId, 'helpers_requests')
        .then(response => {
            return db('helpers_requests')
                .update({
                    ...response,
                    ...body,
                    updated_at: new Date()
                })
                .where({
                    id
                })
                .returning
        })
}

// destroy a help request 
const destroy = (reqId) => {
    return db('helpers_requests')
        .where({
            req_id: reqId
        })
        .del()
        .returning('*')
        .then(([response]) => response)
}

module.exports = {
    index,
    getOne,
    create,
    patch,
    destroy
}