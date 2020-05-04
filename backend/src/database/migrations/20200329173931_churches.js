exports.up = function(knex, Promise) {
    return knex.schema.createTable('churches', function (table) {
         table.increments('id').primary();
         table.string('nome').notNullable();
         table.string('logradouro').notNullable();
         table.string('numero').notNullable();
         table.string('cep').notNullable();
         table.string('estado').notNullable();
         table.string('cidade').notNullable();
         table.decimal('latitude').notNullable();
         table.decimal('longitude').notNullable();
      })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("churches")
  };