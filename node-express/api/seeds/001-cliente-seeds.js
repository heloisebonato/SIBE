
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cliente').del()
    .then(function () {
      // Inserts seed entries
      return knex('cliente').insert([
        {id: 1, nome: 'Roberto Fulano', data_nascimento: '12/12/1997', cnh: '02825159039', cpf: '82564298958', rg: '999999999', cep: '81925230', endereco: 'Rua Exemplo 1', n_casa: '8888', cidade: 'curitiba', estado: 'pr', nome_mae: 'Roberta Fulana', renavam: '29125535080', placa:'ADZ6245'}
      ]);
    });
};
