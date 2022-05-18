import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Carreta} from "../entity/carreta.entity";
//import bcyptjs from "bcryptjs";

export const Carretas = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');


    const repository = getManager().getRepository(Carreta);

    const carretas = await repository.find();


    res.send(carretas.map(U => {
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

export const CreateCarreta = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Carreta);

    const carreta = await repository.save(body)

    res.status(201).send(carreta);
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