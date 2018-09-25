const db = require('../db/knex')

// get all the help requests created by a user 
const index = (userId) => {
    return db('requests')
        .where({
            id: userId
        })
        .join('users', 'users.id', '=', 'requests.user_id')
        .then(requests => requests)
}

// user creates a help request 
const create = (body, userId) => {
    const bodyInsert = {
        description: body.description,
        longitude: body.longitude,
        latitude: body.latitude,
        status: body.status,
        ask_food: body.food,
        ask_shelter: body.shelter,
        ask_water: body.water,
        ask_medical: body.medical,
        user_id: userId
    }
    db('requests')
        .insert(bodyInsert)
        .returning('*')
        .then(([response]) => response)

    return db('requests')
        .join('users', 'users.id', '=', 'requests.user_id')
        .where({
            user_id: userId
        })
        .first()

}


function find(id) {
    return db('requests')
        .where({
            id
        })
        .first()
}


// update a request 
const patch = (id, body) => {
    return find(id)
        .then(response => {
            return db('requests')
                .update({
                    ...response,
                    ...body,
                    updated_at: new Date()
                })
                .where({
                    id
                })
                .returning('*')
                .then(([response]) => response)
        })
}

// destroy request 
function destroy(id) {
    return db('requests')
        .where({
            id
        })
        .del()
        .returning('*')
        .then(([response]) => response)
}



module.exports = {
    index,
    create,
    patch,
    destroy
}