const {
  hashSync
} = require('bcryptjs')

const table = 'requests'


exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    description: "I need help with removing this tree",
    status: "In Progress",
    latitude: "47.619471",
    longitude: "-122.344641",
    ask_food: true,
    ask_water: false,
    ask_shelter: false,
    ask_medical: false,
    user_id: 1
  }, {
    id: 2,
    description: "I need help with removing this tree",
    status: "In Progress",
    latitude: "47.619484",
    longitude: "-122.344655",
    ask_food: false,
    ask_water: false,
    ask_shelter: true,
    ask_medical: false,
    user_id: 2
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};