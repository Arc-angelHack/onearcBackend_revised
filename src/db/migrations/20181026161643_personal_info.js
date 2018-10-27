const table = 'personal_info'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.date('birth_date').notNullable()
    table.string('city').notNullable().defaultsTo('')
    table.string('state').notNullable().defaultsTo('')
    table.string('phone').notNullable().defaultsTo('').unique()
    table.boolean('gps').notNullable().defaultsTo(false)
    table.integer('user_id').notNullable().defaultsTo(0).unique()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable(table)
};