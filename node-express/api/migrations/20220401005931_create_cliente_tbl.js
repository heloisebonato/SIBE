exports.up = async knex => {
    await knex.schema.dropTableIfExists('cliente');
    await knex.schema.createTable('cliente', tbl => {
        tbl.increments();
        tbl.text('nome', 256).notNullable();
        tbl.text('data_nascimento').notNullable();
        tbl.text('telefone', 10).notNullable();
        tbl.text('celular', 10).notNullable();
        tbl.text('cnh', 10).notNullable();
        tbl.text('cpf', 10).notNullable();
        tbl.text('rg', 9).notNullable();
        tbl.text('cep', 8).notNullable();
        tbl.text('endereco', 256).notNullable();
        tbl.text('n_casa', 10).notNullable();
        tbl.text('cidade', 256).notNullable();
        tbl.text('estado', 2).notNullable();
        tbl.text('nome_mae', 55).notNullable();
        tbl.text('renavam', 11).notNullable();
        tbl.text('placa', 7).notNullable();
      });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('cliente');
  };