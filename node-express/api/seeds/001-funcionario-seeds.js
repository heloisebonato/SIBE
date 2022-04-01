
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('funcionario').del()
    .then(function () {
      // Inserts seed entries
      return knex('funcionario').insert([
        {id: 1, nome: 'João Silva', funcao: 'funcionario', login: 'joao1', senha: 'joao1'},
        {id: 2, nome: 'José Silva', funcao: 'funcionario', login: 'jose1', senha: 'jose1'}
      ]);
    });
};
