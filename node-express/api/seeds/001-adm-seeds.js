
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('administrador').del()
    .then(function () {
      // Inserts seed entries
      return knex('administrador').insert([
        {id: 1, nome: 'Maria Silva', funcao: 'adm', login: 'maria1', senha: 'maria1'},
        {id: 2, nome: 'Ricardo Silva', funcao: 'adm', login: 'ricardo1', senha: 'ricardo1'}
      ]);
    });
};
