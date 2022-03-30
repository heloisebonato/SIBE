exports.up = async knex => {
    await knex.schema.createTable('funcionario', tbl => {
      tbl.increments();
      tbl.text('nome', 256).notNullable();
      tbl.text('login', 256).notNullable();
      tbl.text('senha', 256).notNullable();
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('funcionario');
  };