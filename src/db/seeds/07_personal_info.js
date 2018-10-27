const table = 'personal_info'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    birth_date: '1989-02-20',
    city: "San Francisco",
    state: 'CA',
    phone: "213-405-7958",
    gps: true,
    user_id: 1
  }, {
    id: 2,
    birth_date: '1998-11-11',
    city: "Daly City",
    state: 'CA',
    phone: "412-567-7493",
    gps: true,
    user_id: 2
  }, {
    id: 3,
    birth_date: '1993-12-14',
    city: 'San Francisco',
    state: 'CA',
    phone: "469-218-2098",
    gps: true,
    user_id: 3
  }, {
    id: 4,
    birth_date: '1987-10-10',
    city: 'San Francisco',
    state: 'CA',
    phone: "489-253-8974",
    gps: true,
    user_id: 4
  }, {
    id: 5,
    birth_date: '1988-06-10',
    city: "Oakland",
    state: 'CA',
    phone: "490-124-9803",
    gps: true,
    user_id: 5
  }, {
    id: 6,
    birth_date: '1978-03-24',
    city: 'San Francisco',
    state: 'CA',
    phone: "468-314-9834",
    gps: true,
    user_id: 6
  }, {
    id: 7,
    birth_date: '1980-05-16',
    city: 'San Francisco',
    state: 'CA',
    phone: "435-178-9452",
    gps: true,
    user_id: 7
  }, {
    id: 8,
    birth_date: '1992-10-20',
    city: 'San Francisco',
    state: 'CA',
    phone: "409-467-1467",
    gps: true,
    user_id: 8
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};