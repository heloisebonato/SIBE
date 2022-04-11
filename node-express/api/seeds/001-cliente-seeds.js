
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cliente').del()
    .then(function () {
      // Inserts seed entries
      return knex('cliente').insert([
        {id: 1, nome: 'Roberto Fulano', data_nascimento: '12/12/1997', cnh: '02825159039', cpf: '82564298958', rg: '999999999', cep: '81925230', endereco: 'Rua Exemplo 1', n_casa: '8888', cidade: 'curitiba', estado: 'pr', nome_mae: 'Roberta Fulana', renavam: '29125535080', placa:'ADZ6245'},
        {id: 2, nome: 'Sergio Fulano', data_nascimento: '12/12/1998', cnh: '05678245638', cpf: '95367418543', rg: '888888888', cep: '81925230', endereco: 'Rua Exemplo 2', n_casa: '7777', cidade: 'curitiba', estado: 'pr', nome_mae: 'Maria Fulana', renavam: '267842398741', placa:'AJE8244'}
      ]);
    });
};
