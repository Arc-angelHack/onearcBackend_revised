const {
  hashSync
} = require('bcryptjs')

const table = 'resources'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    people_count: 2,
    message: "My wife and I would like some water and food",
    lat: 37.733777,
    long: -122.447576,
    food: true,
    water: true,
    shelter: false,
    medical: false,
    other: false,
    is_an_offer: false,
    finished: false,
    user_id: 1
  }, {
    id: 2,
    people_count: 3,
    message: "My family is looking for a place to stay. Our house is burned down.",
    lat: 37.688643,
    long: -122.45121,
    food: false,
    water: false,
    shelter: true,
    medical: false,
    other: false,
    is_an_offer: false,
    finished: false,
    user_id: 2
  }, {
    id: 3,
    people_count: 5,
    message: "Hi there, I have some food, water and shelter. Let me know if you are intersted.",
    lat: 37.724395,
    long: -122.49313,
    food: true,
    water: true,
    shelter: true,
    medical: false,
    other: false,
    is_an_offer: true,
    finished: false,
    user_id: 4
  }, {
    id: 4,
    people_count: 5,
    message: "I can give you some water.",
    lat: 37.799306,
    long: -122.269284,
    food: false,
    water: true,
    shelter: false,
    medical: false,
    other: false,
    is_an_offer: true,
    finished: false,
    user_id: 5
  }, {
    id: 5,
    people_count: 3,
    message: "I have some first-aid kits that I can give to anyone",
    lat: 37.709186,
    long: -122.407986,
    food: false,
    water: false,
    shelter: false,
    medical: true,
    other: false,
    is_an_offer: true,
    finished: false,
    user_id: 3
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};