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
        Locacao
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
});

