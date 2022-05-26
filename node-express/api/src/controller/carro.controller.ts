import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Carro } from "../entity/carro.entity";
//import bcyptjs from "bcryptjs";

export const Carros = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');


    const repository = getManager().getRepository(Carro);

    const carros = await repository.find();

    console.log(carros);


    res.send(carros.map(U => {
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

export const CreateCarro = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Carro);

    const carro = await repository.save(body);

    //console.log(carro);

    res.status(201).send(carro);
}

export const CreateCarroCliente = async (req: Request, res: Response) => {
    const body = req.body;

    //console.log(body);

    const repository = getManager().getRepository(Carro);

    const carro = await repository.save(body);

    res.status(201).send(carro);
}

export const GetCarro = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carro);
    //{relations: ['role']
    const carro = await repository.findOne({
        where: { 
            carro_id: Number(req.params.carro_id) 
        }

        });

    res.send(carro);
}

export const GetCarroByPlaca = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carro);
    
    const carro = await repository.findOne({
        where: { 
            placa: req.params.placa 
        }

        });

    res.send(carro);
}

export const GetCarrosByCliente = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carro);

    //const cliente_id = req.params.cliente_id

    //const carros = await getManager().query(`select * from carro where cliente_id = ` + cliente_id + `;`);
    
    const carro = await repository.find({
        where: { 
            cliente_id: Number(req.params.cliente_id)
        }

        });

    res.send(carro);
}


export const UpdateCarro = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Carro);

    await repository.update(req.params.carro_id, body);

    const carro = await repository.findOne({
        where: { 
            carro_id: Number(req.params.carro_id) 
        }

        });

    res.status(202).send(carro);
}

export const DeleteCarro = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Carro);

    await repository.delete(req.params.carro_id);

    res.status(204).send(null);
}