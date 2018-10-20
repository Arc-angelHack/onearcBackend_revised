const {
  hashSync
} = require('bcryptjs')

const table = 'resource_transactions'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    resource_id : 1,
    res_user_id: 4
  }, {
    id: 2,
    resource_id: 2,
    res_user_id: 4
  }, {
    id: 3,
    resource_id: 4,
    res_user_id: 8
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};