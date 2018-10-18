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
    latitude: 33.731426,
    longitude: -116.099620,
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
    people_count: 4,
    message: "Hi there, I have some food, water and shelter. Let me know if you are intersted.",
    latitude: 33.738679,
    longitude: -117.209734,
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
    message: "I can give you some water and food.",
    latitude: 37.740563,
    longitude: -122.446198,
    food: true,
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
    latitude: 37.732423,
    longitude: -122.452726,
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