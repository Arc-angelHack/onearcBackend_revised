const table = 'medical_info'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('blood_type').notNullable().defaultsTo('')
    table.string('medication').notNullable().defaultsTo('')
    table.string('insurance').notNullable().defaultsTo('')
    table.string('allergies').notNullable().defaultsTo('')
    table.string('emergency_name').notNullable().defaultsTo('')
    table.string('emergency_phone').notNullable().defaultsTo('')
    table.integer('user_id').notNullable().defaultsTo(0).unique()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable(table)
};