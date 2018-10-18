const {
  hashSync
} = require('bcryptjs')

const table = 'sos_requests'


exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    message: "I can offer help",
    status: "inprogress",
    offer_food: true,
    offer_water: false,
    offer_shelter: false,
    offer_medical: false,
    request_id: 1,
    user_id: 1
  }, {
    id: 2,
    message: "I am coming to help out.",
    status: "inprogress",
    offer_food: false,
    offer_water: false,
    offer_shelter: true,
    offer_medical: false,
    request_id: 2,
    user_id: 2
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};