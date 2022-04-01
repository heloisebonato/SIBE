exports.up = async knex => {
    await knex.schema.dropTableIfExists('funcionario');
    await knex.schema.createTable('funcionario', tbl => {
      tbl.increments();
      tbl.text('nome', 256).notNullable();
      tbl.text('funcao', 16).notNullable();
      tbl.text('login', 55).notNullable();
      tbl.text('senha', 55).notNullable();
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('funcionario');
  };