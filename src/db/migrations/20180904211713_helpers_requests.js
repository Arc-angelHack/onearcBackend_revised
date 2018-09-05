const table = 'helpers_requests'

exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('message').notNullable()
        table.string('latitude')
        table.string('longitude')
        table.string('status')
        table.boolean('offer_food').notNullable().defaultsTo(false)
        table.boolean('offer_water').notNullable().defaultsTo(false)
        table.boolean('offer_medical').notNullable().defaultsTo(false)
        table.boolean('offer_shelter').notNullable().defaultsTo(false)
        table.integer('user_id').notNullable().defaultsTo(0)
        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.integer('request_id').notNullable().defaultsTo(0)
        table.foreign('request_id').references('requests.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
}

exports.down = knex => {
    return knex.schema.dropTable(table)
};