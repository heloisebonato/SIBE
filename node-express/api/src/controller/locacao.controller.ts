import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Carreta} from "../entity/carreta.entity";
import { Carro } from "../entity/carro.entity";
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


export const UpdateCarreta = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Carreta);

    await repository.update(req.params.carreta_id, body);

    const carreta = await repository.findOne({
        where: { 
            carreta_id: Number(req.params.carreta_id) 
        }

        });

    res.status(202).send(carreta);
}

export const DeleteCarreta = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carreta);

    await repository.delete(req.params.carreta_id);

    res.status(204).send(null);
}