BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "funcionario" (
	"id"	integer NOT NULL,
	"nome"	text NOT NULL,
	"login"	text NOT NULL,
	"senha"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "funcionario" VALUES (1,'João Silva','joao1','joao1');
INSERT INTO "funcionario" VALUES (2,'José Silva','jose1','jose1');
COMMIT;
