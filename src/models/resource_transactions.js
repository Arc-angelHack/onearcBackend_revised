const db = require('../db/knex')

const getAll = (resId) => {
    return db('resource_transactions')
        .where({
            resource_id: resId
        })
}

const getAllUser = (userId) => {
    return db("resource_transactions")
        .where({
            res_user_id: userId
        })
}

const createTrans = ({userId, resId}) => {
    return db('resource_transactions')
        .insert({
            resource_id: resId,
            res_user_id: userId
        })
        .returning('*')
        .then(( [response] )=> response)
        .catch(console.log)
}

const deleteTrans = ({userId, resId}) => {
    return db('resource_transactions')
        .where({
            resource_id: resId,
            res_user_id: userId
        })
        .del()
        .returning('*')
        .then(([response]) => response)
        .catch(console.log)
}

module.exports = {
    getAll,
    getAllUser,
    createTrans,
    deleteTrans
}