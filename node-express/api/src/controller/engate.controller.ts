import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Engate} from "../entity/engate.entity";


export const Engates = async (req: Request, res: Response) => {

    const repository = getManager().getRepository(Engate);

    const engate = await repository.find();


    res.send(engate.map(U => {
        const data = U;

        return data;
    }));
}

export const CreateEngate = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Engate);

    const engate = await repository.save(body)

    res.status(201).send(engate);
}

export const GetEngate = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Engate);
    //{relations: ['role']
    const engate = await repository.findOne({
        where: {
            codigo: Number(req.params.codigo)
        }

        });

    res.send(engate);
}

export const GetEngateByName = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Engate);

    const engate = await repository.findOne({
        where: {
            nome: req.params.nome
        }

        });

    res.send(engate);
}


export const UpdateEngate = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Engate);

    await repository.update(req.params.codigo, body);

    const engate = await repository.findOne({
        where: {
            codigo: Number(req.params.codigo)
        }

        });

    res.status(202).send(engate);
}

export const DeleteEngate = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Engate);

    await repository.delete(req.params.codigo);

    res.status(204).send(null);
}