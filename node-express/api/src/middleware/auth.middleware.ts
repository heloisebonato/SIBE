import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {getManager} from "typeorm";
import {Funcionario} from "../entity/funcionario.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const repository = getManager().getRepository(Funcionario);

        //req["funcionario"] = await repository.findOne(payload.id, {relations: ['role', 'role.permissions']});

        const funcionario = await repository.findOne({
            where: { 
                funcionario_id: payload.funcionario_id 
            } 

            });

        req["funcionario"] = funcionario;

        next();
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}