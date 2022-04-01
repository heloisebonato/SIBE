exports.up = async knex => {
    await knex.schema.dropTableIfExists('administrador');
    await knex.schema.createTable('administrador', tbl => {
        tbl.increments();
        tbl.text('nome', 256).notNullable();
        tbl.text('funcao', 16).notNullable();
        tbl.text('login', 55).notNullable();
        tbl.text('senha', 55).notNullable();
      });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('administrador');
  };