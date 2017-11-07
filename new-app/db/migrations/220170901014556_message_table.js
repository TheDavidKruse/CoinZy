
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages',function(table){
    table.increments('id');
    table.text('message');
    table.integer('user_id').references('id').inTable('users');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
