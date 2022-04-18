import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Funcionario} from "../entity/funcionario.entity";
import bcyptjs from "bcryptjs";

export const Funcionarios = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');


    const repository = getManager().getRepository(Funcionario);

    const users = await repository.find({
        relations: ['role']
    });


    res.send(users.map(U => {
        // const {senha, ...data} = U;
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

export const CreateFuncionario = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;
    const hashedSenha = await bcyptjs.hash('1234', 10);

    const repository = getManager().getRepository(Funcionario);

    const {senha, ...funcionario} = await repository.save({
        ...body,
        senha: hashedSenha,
        role: {
            id: role_id
        }
    })

    res.status(201).send(funcionario);
}
// where: { 
//     funcionario_id: funcionario.funcionario_id 
// } 
export const GetFuncionario = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Funcionario);
    //{relations: ['role']
    const {senha, ...funcionario} = await repository.findOne({
        where: { 
            funcionario_id: Number(req.params.funcionario_id) 
        },
        relations: ['role']

        });

    res.send(funcionario);
}

export const UpdateFuncionario = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;

    const repository = getManager().getRepository(Funcionario);

    await repository.update(req.params.funcionario_id, {
        ...body,
        role: {
            id: role_id
        }
    });

    const {senha, ...funcionario} = await repository.findOne({
        where: { 
            funcionario_id: Number(req.params.funcionario_id) 
        },
        relations: ['role']
        

        });

    res.status(202).send(funcionario);
}

export const DeleteFuncionario = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Funcionario);

    await repository.delete(req.params.funcionario_id);

    res.status(204).send(null);
}