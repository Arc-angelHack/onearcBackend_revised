exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('incidents').del()
  await knex('requests').del()
  await knex('helpers_requests').del()
};