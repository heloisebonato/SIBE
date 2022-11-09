const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//require('dotenv').config();


// const server = require('./server');

// const HOST = 'localhost';
// const PORT = 8888;
// routes(server);

// server.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));

import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes } from "./routes";
import { createConnection } from 'typeorm';
import {Funcionario} from "./entity/funcionario.entity";
import cookieParser from 'cookie-parser';
import { Role } from './entity/role.entity';
import { Permission } from './entity/permission.entity';
import { Cliente } from './entity/cliente.entity';
import { Carreta } from './entity/carreta.entity';
import { Carro } from './entity/carro.entity';
import { Locacao } from './entity/locacao.entity';
import { Engate } from './entity/engate.entity';

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "sibe",
    entities: [
        Funcionario,
        Role,
        Permission,
        Cliente,
        Carreta,
        Carro,
        Locacao,
        Engate
    ],
    logging: false,
    synchronize: true
}).then(connection =>{

    const app = express();
    app.use(express.json());

    //console.log(connection)
    app.use(cookieParser());

    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    }));

    routes(app);

    app.listen(8888, () => {
        console.log('listening port 8888');
    });

    // var usesibe = "use sibe;"
    // connection.query(usesibe)
    
    // var filterSearch =
       
	// 	"DROP PROCEDURE IF EXISTS sibe.filterSearch\n"
    //     "CREATE PROCEDURE sibe.filterSearch(pesquisa text)\n" +
    //     "BEGIN\n" +
    //     "IF EXISTS(SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa)\n" +
	// 	"THEN\n" +
	// 	"SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa\n" +
	// 	"else\n" +
	// 	"SELECT * FROM sibe.carreta WHERE placa = pesquisa\n" +
	// 	"END IF\n" +
    //     "END //\n" + ";"

    // connection.query(filterSearch)

    // var historicoCliente =
	// 	"DROP PROCEDURE IF EXISTS sibe.historicoCliente\n"
    //     "CREATE PROCEDURE sibe.historicoCliente(cliente_id text)\n" +
    //     "BEGIN\n" +
    //     "SELECT T1.locacao_id,T1.data_entrada,T1.data_prevista_entrada,T1.data_saida ,T1.data_prevista_saida ,T1.preco_total,T1.status,TCarro.placa as placa_carro,TCarreta.placa as placa_carreta,TCliente.nome\n" +
	// 	"FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id inner join carro as TCarro on T3.carro_id = TCarro.carro_id inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id\n" +
	// 	"WHERE TCliente.cliente_id = cliente_id\n" +
    //     "END //\n" + ";"

    // connection.query(historicoCliente)

    // var notificacao =
	// 	"DROP PROCEDURE IF EXISTS sibe.notificacao\n"
    //     "CREATE PROCEDURE sibe.notificacao()\n" +
    //     "BEGIN\n" +
    //     "SELECT T1.locacao_id,T1.data_entrada,T1.data_prevista_entrada,T1.data_saida ,T1.data_prevista_saida ,T1.preco_total,T1.status,CASE WHEN (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900' AND data_saida = '01/01/1900') THEN 'Atrasado Retirada' WHEN (date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900') THEN 'Atrasado Retorno' ELSE 'Sem Atraso' END as status_agendamento ,TCarro.placa as placa_carro ,TCarreta.placa as placa_carreta ,TCliente.nome\n" +
	// 	"FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id inner join carro as TCarro on T3.carro_id = TCarro.carro_id inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id\n" +
	// 	"WHERE (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900') OR\n" +
	// 	"(date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_saida = '01/01/1900')\n" +
    //     "END //\n" + ";"
    
    // connection.query(notificacao)

    // var produtosAtivos =
	// 	"DROP PROCEDURE IF EXISTS sibe.produtosAtivos\n"
    //     "CREATE PROCEDURE sibe.produtosAtivos()\n" +
    //     "BEGIN\n" +
    //     "SELECT T1.locacao_id ,T1.data_entrada,T1.data_prevista_entrada,T1.data_saida ,T1.data_prevista_saida ,T1.preco_total,T1.status,TCarro.placa as placa_carro,TCarreta.placa as placa_carreta,TCliente.nome\n" +
	// 	"FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id inner join carro as TCarro on T3.carro_id = TCarro.carro_id inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id\n" +
	// 	"WHERE T1.status = 'Operante'\n" +
    //     "END //\n" + ";"

    // connection.query(produtosAtivos)
});

