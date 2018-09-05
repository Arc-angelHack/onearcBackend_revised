const table = 'requests'

exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('description').notNullable()
        table.string('latitude')
        table.string('longitude')
        table.string('status')
        table.boolean('ask_food').notNullable().defaultsTo(false)
        table.boolean('ask_water').notNullable().defaultsTo(false)
        table.boolean('ask_medical').notNullable().defaultsTo(false)
        table.boolean('ask_shelter').notNullable().defaultsTo(false)
        table.integer('user_id').notNullable().defaultsTo(0)
        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
}

exports.down = knex => {
    return knex.schema.dropTable(table)
};