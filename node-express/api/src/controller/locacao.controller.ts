import {Request, Response} from "express";
import { stat } from "fs";
import {getManager} from "typeorm";
import {Carreta} from "../entity/carreta.entity";
import { Carro } from "../entity/carro.entity";
import { Cliente } from "../entity/cliente.entity";
import {Locacao} from "../entity/locacao.entity";
//import bcyptjs from "bcryptjs";

export const Locacoes = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');


    const repository = getManager().getRepository(Locacao);

    const locacoes = await repository.find();


    res.send(locacoes.map(U => {
        const data = U;

        return data;
    }));
}


export const Locacoes_ = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');
    const query = `SELECT T1.locacao_id
    ,T1.data_entrada
    ,T1.data_prevista_entrada
    ,T1.data_saida 
    ,T1.data_prevista_saida 
    ,T1.preco_total
    ,T1.status
    ,TCarro.placa as placa_carro
    ,TCarreta.placa as placa_carreta
    ,TCliente.nome
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id;`;

    const rawData = await getManager().query(query);


    const repository = getManager().getRepository(Locacao);

    const locacoes = await repository.find();


    res.send(rawData.map(U => {
        const data = U;

        return data;
    }));

    // const [data, total] = await repository.findAndCount({
    //     take,
    //     skip: (page - 1) * take,
    //     relations: ['role']
    // })

    // res.send({
    //     data: data.map(u => {
    //         const {password, ...data} = u;

    //         return data;
    //     }),
    //     meta: {
    //         total,
    //         page,
    //         last_page: Math.ceil(total / take)
    //     }
    // });
}

export const Locacoes_por_Id = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');
    const query = `SELECT T1.locacao_id
    ,T1.data_entrada
    ,T1.data_prevista_entrada
    ,T1.data_saida 
    ,T1.data_prevista_saida 
    ,T1.preco_total
    ,T1.status
    ,TCarro.placa as placa_carro
    ,TCarreta.placa as placa_carreta
    ,TCliente.nome
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id
            where T1.locacao_id=` + req.params.locacao_id + `;`;

    const rawData = await getManager().query(query);


    const repository = getManager().getRepository(Locacao);

    const locacoes = await repository.find();


    res.send(rawData.map(U => {
        const data = U;

        return data;
    }));

    // const [data, total] = await repository.findAndCount({
    //     take,
    //     skip: (page - 1) * take,
    //     relations: ['role']
    // })

    // res.send({
    //     data: data.map(u => {
    //         const {password, ...data} = u;

    //         return data;
    //     }),
    //     meta: {
    //         total,
    //         page,
    //         last_page: Math.ceil(total / take)
    //     }
    // });
}

export const CreateLocacao = async (req: Request, res: Response) => {
    const {data_entrada, data_prevista_entrada, data_saida, data_prevista_saida, preco_total} = req.body
   
    const body = req.body;

    const repository_carreta = getManager().getRepository(Carreta);

    const carreta = await repository_carreta.find({
        where: { 
            placa: req.params.placa_carreta
        }

        });

    const repository_carro = getManager().getRepository(Carro);

    const carro = await repository_carro.find({
        where: { 
            placa: req.params.placa_carro
        }

        });

    const carreta_update = await repository_carreta.update(carreta[0].carreta_id, {
        placa: carreta[0].placa,
        tipo: carreta[0].tipo,
        status: "Locada",
        preco: carreta[0].preco

    });

    const repository = getManager().getRepository(Locacao);



    const locacao = await repository.save({
        data_entrada,
        data_prevista_entrada,
        data_saida,
        data_prevista_saida,
        preco_total,
        status: "Agendado",
        carro: carro,
        carreta: carreta,
    })

    res.status(201).send(locacao);
}

export const GetCarreta = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carreta);
    //{relations: ['role']
    const carreta = await repository.findOne({
        where: { 
            carreta_id: Number(req.params.carreta_id) 
        }

        });

    res.send(carreta);
}

export const GetCarretaByPlaca = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carreta);
    
    const carreta = await repository.findOne({
        where: { 
            placa: req.params.placa 
        }

        });

    res.send(carreta);
}


export const UpdateLocacao = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Locacao);

    await repository.update(req.params.locacao_id, body);

    const locacao = await repository.findOne({
        where: { 
            locacao_id: Number(req.params.locacao_id) 
        }

        });

    res.status(202).send(locacao);
}

export const DeleteCarreta = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carreta);

    await repository.delete(req.params.carreta_id);

    res.status(204).send(null);
}

export const GetInfoPesquisar = async (req: Request, res: Response) => {


    const query = `call filterSearch('` + req.params.valor + `');`;

    const rawData = await getManager().query(query);


    //const repository = getManager().getRepository(Locacao);

    //const locacoes = await repository.find();


    res.send(rawData.map(U => {
        const data = U;

        return data;
    }));

    // const repository_carreta = getManager().getRepository(Carreta);
    
    // const carreta = await repository_carreta.findOne({
    //     where: { 
    //         placa: req.params.valor 
    //     }

    //     });
    
    // if (carreta != null){
    //     res.send(carreta);
    // }
    
    // const repository_cliente = getManager().getRepository(Cliente);

    // const clienteCpf = await repository_cliente.findOne({
    //     where: { 
    //         cpf: req.params.valor
    //     }

    //     });
    
    // if (clienteCpf != null){
    //     res.send(clienteCpf);
    // }

    // const clienteNome = await repository_cliente.findOne({
    //     where: { 
    //         nome: req.params.valor
    //     }

    //     });
    
    // if (clienteNome != null){
    //     res.send(clienteNome);
    // }

    //res.status(404).send(null);
}