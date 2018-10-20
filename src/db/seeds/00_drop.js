exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('incidents').del()
  await knex('resources').del()
  await knex('sos_requests').del()
  await knex('resource_transactions').del()
};