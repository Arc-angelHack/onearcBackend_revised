const table = 'medical_info'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    blood_type: 'O',
    allergies: 'Peanuts - difficult breathing',
    medication: "Metformin",
    insurance: "Medicare-1EG4-TE5-MK72",
    emergency_name: "Charles Potter",
    emergency_phone: "415-205-7858",
    user_id: 1
  }, {
    id: 2,
    blood_type: 'AB',
    allergies: 'Penicillin - severe reaction',
    medication: "Protazen",
    insurance: "Premera-1ET4-GS9-LK71",
    emergency_name: "Amy Barbara",
    emergency_phone: "214-567-7898",
    user_id: 2
  }, {
    id: 3,
    blood_type: 'B',
    allergies: 'Crab - itchy, redness',
    medication: "",
    insurance: "Medicare-7G8H-LG9-NL09",
    emergency_name: "Harry Hurlow",
    emergency_phone: "798-098-4524",
    user_id: 3
  }, {
    id: 4,
    blood_type: 'A',
    allergies: 'Diary - bloating, nauseous',
    medication: "Meperidine",
    insurance: "Premera-9T4K-LS9-PO89",
    emergency_name: "Jennifer Austin",
    emergency_phone: "868-343-2343",
    user_id: 4
  }, {
    id: 5,
    blood_type: 'AB',
    allergies: 'Aspirin - severe reaction',
    medication: "Oxycodone",
    insurance: "Premera-1ET4-GS9-LK71",
    emergency_name: "Adams Bentley",
    emergency_phone: "214-567-7898",
    user_id: 5
  }, {
    id: 6,
    blood_type: 'O',
    allergies: 'Insulin - mild reaction',
    medication: "Morphine",
    insurance: "Medicare-2LT4-GH9-OP15",
    emergency_name: "Ron Potter",
    emergency_phone: "489-709-1453",
    user_id: 6
  }, {
    id: 7,
    blood_type: 'B',
    allergies: '',
    medication: "",
    insurance: "Premera-8Y9O-NG8-LO98",
    emergency_name: "Halsey Blue",
    emergency_phone: "214-573-9834",
    user_id: 7
  }, {
    id: 8,
    blood_type: 'O',
    allergies: 'Phenytoin - mild reaction',
    medication: "",
    insurance: "Premera-9G7H-LO8-MN97",
    emergency_name: "Tracy Adams",
    emergency_phone: "215-469-2904",
    user_id: 8
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};