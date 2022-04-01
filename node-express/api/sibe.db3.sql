BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "funcionario" (
	"id"	integer NOT NULL,
	"nome"	text NOT NULL,
	"funcao"	text NOT NULL,
	"login"	text NOT NULL,
	"senha"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "administrador" (
	"id"	integer NOT NULL,
	"nome"	text NOT NULL,
	"funcao"	text NOT NULL,
	"login"	text NOT NULL,
	"senha"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "cliente" (
	"id"	integer NOT NULL,
	"nome"	text NOT NULL,
	"data_nascimento"	text NOT NULL,
	"cnh"	text NOT NULL,
	"cpf"	text NOT NULL,
	"rg"	text NOT NULL,
	"cep"	text NOT NULL,
	"endereco"	text NOT NULL,
	"n_casa"	text NOT NULL,
	"cidade"	text NOT NULL,
	"estado"	text NOT NULL,
	"nome_mae"	text NOT NULL,
	"renavam"	text NOT NULL,
	"placa"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "funcionario" VALUES (1,'João Silva','funcionario','joao1','joao1');
INSERT INTO "funcionario" VALUES (2,'José Silva','funcionario','jose1','jose1');
INSERT INTO "administrador" VALUES (1,'Maria Silva','adm','maria1','maria1');
INSERT INTO "administrador" VALUES (2,'Ricardo Silva','adm','ricardo1','ricardo1');
INSERT INTO "cliente" VALUES (1,'Roberto Fulano','12/12/1997','02825159039','82564298958','999999999','81925230','Rua Exemplo 1','8888','curitiba','pr','Roberta Fulana','29125535080','ADZ6245');
COMMIT;
